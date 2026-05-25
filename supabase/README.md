# Tindord — Notifications Discord en prod

## Pourquoi ça ne marche pas tel quel

Le client envoie le webhook lui-même. Si l'utilisateur n'a pas l'onglet ouvert au moment de l'événement, **rien ne part**. Pour que ça marche pour de vrai, les notifs doivent partir du serveur.

## Architecture cible

```
[client A swipe]
    │
    │ insert into public.likes
    ▼
[Supabase Postgres]
    │
    │ trigger: si réciproque → insert into public.matches
    │
    │ Database Webhook (sur INSERT likes/matches/messages)
    ▼
[Edge Function /functions/v1/notify]
    │
    │ lit user_notif_prefs du destinataire
    │ POST embed JSON
    ▼
[Webhook Discord du user]
```

Avantage : ça marche même si tous les onglets sont fermés.

## Setup (une fois)

### 1. Tables + trigger + RLS

Dans **Supabase Dashboard → SQL Editor**, exécuter `schema.sql`.

### 2. Déployer l'Edge Function

```bash
supabase functions deploy notify --no-verify-jwt
```

`--no-verify-jwt` parce que c'est appelé par les Database Webhooks (pas par un user authentifié).

### 3. Brancher 3 Database Webhooks

Dashboard → Database → Webhooks → Create.

| # | Name           | Table             | Events  | URL                                      |
|---|----------------|-------------------|---------|------------------------------------------|
| 1 | notif_like     | public.likes      | Insert  | `https://<project>.supabase.co/functions/v1/notify` |
| 2 | notif_match    | public.matches    | Insert  | `https://<project>.supabase.co/functions/v1/notify` |
| 3 | notif_message  | public.messages   | Insert  | `https://<project>.supabase.co/functions/v1/notify` |

Method **POST**, payload par défaut (table + record).

## Côté client

Quand l'utilisateur configure son webhook + toggles dans Paramètres, faire un upsert dans `user_notif_prefs` (le code actuel le stocke juste en `state.user.discordWebhook`, il faut ajouter le sync DB) :

```js
async function syncNotifPrefs() {
  const u = state.user || {};
  if (!u.discordId) return;
  const { data: { user } } = await supa.auth.getUser();
  if (!user) return;
  const t = u.notifTypes || {};
  await supa.from('user_notif_prefs').upsert({
    user_id:        user.id,
    discord_webhook: u.discordWebhook || null,
    notif_like:    !!t.like,
    notif_match:   !!t.match,
    notif_message: !!t.message,
    display_name:  u.displayName || null,
    avatar_url:    u.avatarUrl || null,
    c1:            u.profileColor || '#9146FF',
  });
}
```

Et pour les vraies actions :

- **Swipe LIKE** : `await supa.from('likes').insert({ from_user: me, to_user: target })`
- **Envoi message** : `await supa.from('messages').insert({ match_id, sender: me, content })`

Le trigger SQL crée le match auto si réciproque, et les Database Webhooks s'occupent du reste.

## Tester en local

```bash
supabase functions serve notify
```

Puis simuler un payload :

```bash
curl -X POST http://localhost:54321/functions/v1/notify \
  -H "Content-Type: application/json" \
  -d '{"type":"INSERT","table":"likes","record":{"from_user":"...","to_user":"..."}}'
```

## Limites de cette approche

- **Spam protection** : Discord webhooks ont un rate-limit (~30/min). Si un user reçoit 100 likes d'un coup, certaines notifs seront perdues. Ajouter un debounce/aggregation côté Edge Function pour la prod sérieuse.
- **Pas de bouton "marquer comme lu"** : la notif Discord est juste un signal, l'app reste source de vérité.
- **Webhook URL leak** : l'URL est stockée en DB. RLS empêche les autres users de la lire. Mais si la DB leak, les webhooks sont exposés (l'attaquant peut spammer ces channels). Rotation manuelle si compromise.
