// Tindord — Edge Function "notify".
// Déclenchée par les Supabase Database Webhooks sur INSERT dans likes/matches/messages.
// Lit la préférence du destinataire et POST au webhook Discord configuré.
//
// Déploiement :
//   supabase functions deploy notify --no-verify-jwt
//
// Variables d'env requises (déjà dispo dans Edge runtime) :
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

type Payload = {
  type: "INSERT";
  table: "likes" | "matches" | "messages";
  record: Record<string, unknown>;
};

const SB_URL = Deno.env.get("SUPABASE_URL")!;
const SB_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const COLORS = { like: 0xff4fa0, match: 0x9146ff, message: 0x5be9ff };

function avatarFallback(name: string | null, c1: string | null) {
  const n = encodeURIComponent(name || "?");
  const c = (c1 || "#9146FF").replace("#", "");
  return `https://ui-avatars.com/api/?name=${n}&size=128&background=${c}&color=fff&bold=true&format=png`;
}

async function loadPrefs(sb: ReturnType<typeof createClient>, userId: string) {
  const { data } = await sb.from("user_notif_prefs").select("*").eq("user_id", userId).maybeSingle();
  return data as null | {
    discord_webhook: string | null;
    notif_like: boolean;
    notif_match: boolean;
    notif_message: boolean;
    display_name: string | null;
    avatar_url: string | null;
    c1: string | null;
  };
}

async function sendWebhook(url: string, embed: Record<string, unknown>) {
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "Tindord",
      avatar_url: "https://ui-avatars.com/api/?name=T&size=128&background=9146FF&color=fff&bold=true&format=png",
      embeds: [embed],
    }),
  });
  return r.ok;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const body = (await req.json()) as Payload;
  const sb = createClient(SB_URL, SB_KEY);

  try {
    if (body.table === "likes") {
      const toUser = body.record.to_user as string;
      const fromUser = body.record.from_user as string;
      const [recipient, sender] = await Promise.all([loadPrefs(sb, toUser), loadPrefs(sb, fromUser)]);
      if (!recipient?.discord_webhook || !recipient.notif_like) return new Response("skip", { status: 200 });
      const thumb = sender?.avatar_url || avatarFallback(sender?.display_name || null, sender?.c1 || null);
      await sendWebhook(recipient.discord_webhook, {
        title: "❤️ Nouveau like sur Tindord",
        description: `**${sender?.display_name || "Quelqu'un"}** t'a liké !`,
        color: COLORS.like,
        thumbnail: { url: thumb },
        timestamp: new Date().toISOString(),
        footer: { text: "Tindord" },
      });
    }

    if (body.table === "matches") {
      const userA = body.record.user_a as string;
      const userB = body.record.user_b as string;
      const [pa, pb] = await Promise.all([loadPrefs(sb, userA), loadPrefs(sb, userB)]);
      const pairs = [
        { me: pa, other: pb },
        { me: pb, other: pa },
      ];
      for (const { me, other } of pairs) {
        if (!me?.discord_webhook || !me.notif_match) continue;
        const thumb = other?.avatar_url || avatarFallback(other?.display_name || null, other?.c1 || null);
        await sendWebhook(me.discord_webhook, {
          title: "💞 C'est un match !",
          description: `Tu as matché avec **${other?.display_name || "quelqu'un"}** sur Tindord.`,
          color: COLORS.match,
          thumbnail: { url: thumb },
          timestamp: new Date().toISOString(),
          footer: { text: "Tindord" },
        });
      }
    }

    if (body.table === "messages") {
      const sender = body.record.sender as string;
      const matchId = body.record.match_id as number;
      const content = (body.record.content as string) || "";
      const { data: match } = await sb.from("matches").select("user_a,user_b").eq("id", matchId).maybeSingle();
      if (!match) return new Response("no match", { status: 200 });
      const recipientId = match.user_a === sender ? match.user_b : match.user_a;
      const [recipient, senderPrefs] = await Promise.all([loadPrefs(sb, recipientId), loadPrefs(sb, sender)]);
      if (!recipient?.discord_webhook || !recipient.notif_message) return new Response("skip", { status: 200 });
      const thumb = senderPrefs?.avatar_url || avatarFallback(senderPrefs?.display_name || null, senderPrefs?.c1 || null);
      await sendWebhook(recipient.discord_webhook, {
        title: "💬 Nouveau message Tindord",
        description: `**${senderPrefs?.display_name || "Quelqu'un"}** t'a écrit :\n> ${content.slice(0, 200)}`,
        color: COLORS.message,
        thumbnail: { url: thumb },
        timestamp: new Date().toISOString(),
        footer: { text: "Tindord" },
      });
    }

    return new Response("ok", { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("err", { status: 500 });
  }
});
