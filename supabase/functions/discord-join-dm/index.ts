// Matefindr — Edge Function "discord-join-dm".
// Ajoute l'utilisateur fraîchement connecté au serveur Discord (grâce au scope
// OAuth `guilds.join`), puis lui envoie un DM de bienvenue — le tout via le BOT.
//
// Appelée depuis le client après login (window.__discordJoinDM), avec le body :
//   { access_token: <provider_token Discord de l'utilisateur>, user_id: <son id Discord> }
//
// Déploiement :
//   supabase functions deploy discord-join-dm --no-verify-jwt
//
// Secrets requis (à définir une seule fois) :
//   supabase secrets set DISCORD_BOT_TOKEN="ton_bot_token" DISCORD_GUILD_ID="id_du_serveur"
// Optionnel :
//   supabase secrets set DISCORD_WELCOME_MESSAGE="Bienvenue sur Matefindr ! 🎉"

const BOT_TOKEN = Deno.env.get("DISCORD_BOT_TOKEN") ?? "";
const GUILD_ID = Deno.env.get("DISCORD_GUILD_ID") ?? "";
const WELCOME = Deno.env.get("DISCORD_WELCOME_MESSAGE") ??
  "Bienvenue sur Matefindr ! 🎉 Tu fais maintenant partie du serveur. Swipe, like, match → https://matefindr.com";

const API = "https://discord.com/api/v10";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  if (!BOT_TOKEN || !GUILD_ID) {
    return json({ error: "bot_non_configure", hint: "définis DISCORD_BOT_TOKEN et DISCORD_GUILD_ID" }, 500);
  }

  let access_token = "";
  let user_id = "";
  try {
    const b = await req.json();
    access_token = String(b.access_token || "");
    user_id = String(b.user_id || "");
  } catch {
    return json({ error: "bad_json" }, 400);
  }
  if (!access_token) return json({ error: "access_token_manquant" }, 400);

  // 1) Anti-abus : le token doit appartenir à l'utilisateur annoncé.
  const meRes = await fetch(`${API}/users/@me`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  if (!meRes.ok) return json({ error: "token_discord_invalide", status: meRes.status }, 401);
  const me = await meRes.json();
  const uid = String(me.id);
  if (user_id && user_id !== uid) return json({ error: "user_id_mismatch" }, 403);

  // 2) Ajoute au serveur (idempotent : 201 = ajouté, 204 = déjà membre).
  const joinRes = await fetch(`${API}/guilds/${GUILD_ID}/members/${uid}`, {
    method: "PUT",
    headers: { Authorization: `Bot ${BOT_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ access_token }),
  });
  const joined = joinRes.status === 201;
  const already = joinRes.status === 204;
  if (!joined && !already) {
    const detail = await joinRes.text().catch(() => "");
    // 403 le plus souvent = le bot n'a pas la permission "Créer une invitation"
    // ou le scope guilds.join manque sur le token.
    return json({ error: "join_echoue", status: joinRes.status, detail: detail.slice(0, 300) }, 502);
  }

  // 3) DM de bienvenue — best-effort, n'échoue jamais le join.
  let dm = false;
  try {
    const chRes = await fetch(`${API}/users/@me/channels`, {
      method: "POST",
      headers: { Authorization: `Bot ${BOT_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ recipient_id: uid }),
    });
    if (chRes.ok) {
      const ch = await chRes.json();
      const msgRes = await fetch(`${API}/channels/${ch.id}/messages`, {
        method: "POST",
        headers: { Authorization: `Bot ${BOT_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify({ content: WELCOME }),
      });
      dm = msgRes.ok;
    }
  } catch (_) {
    // DM facultatif (l'utilisateur a peut-être bloqué les MP) → on ignore.
  }

  return json({ ok: true, joined, already, dm, user: uid });
});
