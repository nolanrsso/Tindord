# Graph Report - .  (2026-06-27)

## Corpus Check
- 6 files · ~60,000 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 281 nodes · 358 edges · 18 communities (16 shown, 2 thin omitted)
- Extraction: 77% EXTRACTED · 23% INFERRED · 0% AMBIGUOUS · INFERRED: 84 edges (avg confidence: 0.8)
- Token cost: 232,354 input · 18,000 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Comptes, Auth & Boost UI|Comptes, Auth & Boost UI]]
- [[_COMMUNITY_Éditeur de profil|Éditeur de profil]]
- [[_COMMUNITY_Deck swipe & profils|Deck swipe & profils]]
- [[_COMMUNITY_Backend likesmatch & bot|Backend likes/match & bot]]
- [[_COMMUNITY_Médias & connexions profil|Médias & connexions profil]]
- [[_COMMUNITY_Bulles animées (landing)|Bulles animées (landing)]]
- [[_COMMUNITY_Statut & match (FAB)|Statut & match (FAB)]]
- [[_COMMUNITY_Notifs serveur (webhooks)|Notifs serveur (webhooks)]]
- [[_COMMUNITY_Boost & fetch Discord|Boost & fetch Discord]]
- [[_COMMUNITY_Messagerie & previews média|Messagerie & previews média]]
- [[_COMMUNITY_Aperçu compte & vocal|Aperçu compte & vocal]]
- [[_COMMUNITY_Bulles physique & orbit|Bulles physique & orbit]]
- [[_COMMUNITY_Checkout  paiement Boost|Checkout / paiement Boost]]
- [[_COMMUNITY_Variante v2 (landingi18n)|Variante v2 (landing/i18n)]]
- [[_COMMUNITY_Edge Function notify|Edge Function notify]]
- [[_COMMUNITY_Discord FAB (compte)|Discord FAB (compte)]]
- [[_COMMUNITY_Recadrage bannière|Recadrage bannière]]

## God Nodes (most connected - your core abstractions)
1. `Tindord Landing page` - 14 edges
2. `localStorage bridge (hydrateFromSite/writeState)` - 12 edges
3. `Supabase client (supa / window.__supa)` - 11 edges
4. `Edge Function notify (index.ts)` - 10 edges
5. `Swipe Deck & Drag` - 9 edges
6. `state.user (live user model)` - 9 edges
7. `Discord OAuth Module` - 8 edges
8. `Supabase backend` - 8 edges
9. `persist (debounced 400ms call to writeState)` - 8 edges
10. `renderOrbs (render interest bubbles around card, drag-to-place, del/edit, music play)` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Discord user webhook` --semantically_similar_to--> `Violet/Pink color palette (#0D0B1E/#9146FF/#FF7EB6)`  [INFERRED] [semantically similar]
  supabase/README.md → tindord/chats/chat1.md
- `table profiles (discord_id)` --shares_data_with--> `Supabase client (supa / window.__supa)`  [INFERRED]
  supabase/functions/notify/index.ts → index.html
- `Edge Function notify (index.ts)` --shares_data_with--> `index.html recordLike() (insert likes)`  [INFERRED]
  supabase/functions/notify/index.ts → index.html
- `Interest bubbles (orbs) — swipe-scale layout` --semantically_similar_to--> `Tindord main app — v2 variant (v2/index.html)`  [INFERRED] [semantically similar]
  editor.html → v2/index.html
- `localStorage tindord_state (boostPlan/boostNextPayment/boostSince)` --conceptually_related_to--> `Supabase client (supa / window.__supa)`  [INFERRED]
  checkout.html → index.html

## Hyperedges (group relationships)
- **Discord auth → enrich profile → cloud sync** — index_sign_in_with_discord, index_user_from_supabase_session, index_build_user_profile, index_sync_my_profile_to_cloud [INFERRED 0.85]
- **Like → reciprocal match → realtime chat** — index_record_like, index_trigger_match, index_start_match, index_realtime, index_play_match_animation [INFERRED 0.85]
- **Deck build → card → orbs/gifs/voice render** — index_ensure_deck, index_build_card, index_render_orbs, index_render_swipe_gifs, index_bind_card_voice [INFERRED 0.75]
- **Edit → persist → writeState → localStorage + scheduleDbSync → syncToDb → Supabase profiles** — editor_state_s, editor_persist, editor_writestate, editor_scheduledbsync, editor_synctodb, editor_builddbprofile [EXTRACTED 1.00]
- **Import media → openCrop → setCroppedMedia → edUpload (Storage) → persist → card render** — editor_opencrop, editor_setcroppedmedia, editor_edupload, editor_persist, editor_hydratefromsite [INFERRED 0.85]
- **Guided tour STEPS: voice → color → bubbles → GIF → bg, watchPanel pauses on open panel** — editor_tutorial, editor_watchpanel, editor_voice_modal, editor_rendercolorsheet, editor_bubblessheet, editor_gifs_sheet, editor_bg_sheet [EXTRACTED 1.00]
- **Flux notif serveur : INSERT DB -> Database Webhook -> Edge Function notify -> embed -> webhook + MP bot** — db_likes, readme_database_webhooks, notify_fn, notify_send_webhook, notify_dm_user [INFERRED 0.85]
- **Actions Discord par le bot (token partage) : auto-join + DM bienvenue + MP notif** — shared_bot_token, joindm_guild_add, joindm_welcome_dm, notify_dm_user [INFERRED 0.85]
- **Activation Boost : plan/promo -> activateBoost -> localStorage tindord_state -> bonus app** — checkout_plan_selector, checkout_promo_code, checkout_activate_boost, checkout_localstorage_state, index_boost_orbbudget [INFERRED 0.75]

## Communities (18 total, 2 thin omitted)

### Community 0 - "Comptes, Auth & Boost UI"
Cohesion: 0.07
Nodes (37): Auth Modal (Providers + Email), Badge Picker Panel, Boost Banner (outside acc-card), Boost Modal (2-col upsell), Header & Brand Nav, Language Switcher, Liked Me Panel (Boost), Account Render & Preview (+29 more)

### Community 1 - "Éditeur de profil"
Cohesion: 0.07
Nodes (36): addOrb (add interest bubble, enforce orbMax + dedupe), applyColors/applyColor (card gradient c1→c2, color picker), applyTagBlur/applyUsernameBoostStyle (handle blur + golden Boost username style), renderBgSheet/applyBg (card background sheet: preset or custom image/video, Boost-gated), userHasBoost/stripBoostElements (Boost gate: GIFs, custom bg, intro music reserved to Boost), renderBubblesSheet (bubble search sheet: music/game/film, suggestions + covers), updateBubbleWarning (persistent warning when <4 bubbles → others' info locked), buildDbProfile (build Supabase data jsonb payload from full localStorage state) (+28 more)

### Community 2 - "Deck swipe & profils"
Cohesion: 0.1
Nodes (31): autoResyncDiscord, bindCardVoice (voice memo player), buildCard (swipe card), buildUserProfile, commitSwipe / attachDrag, __discordJoinDM (auto-join + bot DM), dismissLiker (DISMISSED_LIKERS), ensureDeck / ensureDeckSync (swipe deck) (+23 more)

### Community 3 - "Backend likes/match & bot"
Cohesion: 0.11
Nodes (24): table likes (from_user/to_user), table matches (user_a/user_b), table messages (sender/match_id/content), table profiles (discord_id), index.html recordLike() (insert likes), Anti-abus : GET /users/@me vérifie user_id == token, Edge Function discord-join-dm (index.ts), PUT /guilds/{id}/members/{uid} — ajout au serveur (+16 more)

### Community 4 - "Médias & connexions profil"
Cohesion: 0.12
Nodes (21): Avatar crop (zoom/pan), Avatar decoration layer (Discord), Background picker, Connections (app logos + username), Discord resync button, Entry music picker (scrub window), Entry snapshot (cancel baseline), Eye toggles (hide preview) (+13 more)

### Community 5 - "Bulles animées (landing)"
Cohesion: 0.11
Nodes (21): Bubble-bubble elastic collisions, Click explosion (flash/ring/shards/sparks/shockwave), Interactive floating bubble field, Mouse repulsion (~170px field), 15s respawn from left/right wall, Violet/Pink color palette (#0D0B1E/#9146FF/#FF7EB6), Fixed corner controls (Discord left / lang right), Discord CTA button (triple glow) (+13 more)

### Community 6 - "Statut & match (FAB)"
Cohesion: 0.16
Nodes (16): Badge FAB (looking_for picker), Badge FAB Popup (chill/game/talk/sleep), Boost Tab (2-col layout), CONVOS Array (chat threads), createMatchFromLiker() Function, Fly-to-FAB Animation Pattern, Forbidden UI Zones (nav/FAB exclusion), Heart FAB (likes received) (+8 more)

### Community 7 - "Notifs serveur (webhooks)"
Cohesion: 0.21
Nodes (15): Database Webhooks (notif_like/match/message), Discord user webhook, likes table (public.likes), matches table (public.matches), messages table (public.messages), --no-verify-jwt deploy flag, notify edge function, Reciprocal-like match trigger (+7 more)

### Community 8 - "Boost & fetch Discord"
Cohesion: 0.16
Nodes (15): Boost (refreshBoostUI / Fake Nitro / billing), Landing bubble field (spawn/step/explode), applyBgChoice / custom background (Boost), fetchDiscordGuilds, fetchDiscordProfile, orbBudget (Boost orb count), orbRelLayout (orb placement truth source), Password gate (accès privé) (+7 more)

### Community 9 - "Messagerie & previews média"
Cohesion: 0.15
Nodes (14): Messages Panel & FAB, Anime/Wiki Search, iTunes Preview Fallback, Messages/Chat Module, Orb Music Player (fade), Profile Orbs (Bubbles), Spotify Search Integration, Swipe Background Music Player (+6 more)

### Community 10 - "Aperçu compte & vocal"
Cohesion: 0.21
Nodes (12): Account Live Profile Preview, Account Voice Player Widget, Archive/Restore on Discord Reconnect, Age+Gender Badge Below Banner, Card Voice Playing State (data-playing), Swipe Card Voice Memo Widget, Dirty-State Tracking Pattern, Onboarding Genre (3 options + skip link) (+4 more)

### Community 11 - "Bulles physique & orbit"
Cohesion: 0.18
Nodes (11): Bulles Mouse Repulsion, Bulles Fullscreen Orbit Module, Bulles Pairwise Collision (elastic), Bulles Physics Simulation (drift+repulsion+collision), Deezer Preview Fallback (JSONP), GAME_COVER_OVERRIDES Map, Image Transparency Detection, iTunes Preview Fallback (+3 more)

### Community 12 - "Checkout / paiement Boost"
Cohesion: 0.22
Nodes (9): activateBoost() — écrit localStorage tindord_state, Boost feature list (16 bulles, Fake Nitro, filtre H/F, likes secrets, GIFs), localStorage tindord_state (boostPlan/boostNextPayment/boostSince), checkout.html — Tindord Boost paiement, Plan unique 14,99€ à vie (meilleur deal), Plan mensuel 3,79€ /mois (sans engagement), Plan selector (monthly / lifetime), Code promo → Boost offert (+1 more)

### Community 13 - "Variante v2 (landing/i18n)"
Cohesion: 0.29
Nodes (8): External API: Google OAuth2 (v2 only), Design Decision: v1 full SPA vs v2 landing-only, v2 Auth Modal (Discord + Google + Email), v2 Animated Bubble Field, v2 i18n Dictionary (FR/EN, landing-only), v2 Language Switcher, v2 Screen: Landing / Hero, Tindord Application (v2 Landing)

### Community 14 - "Edge Function notify"
Cohesion: 0.43
Nodes (5): avatarFallback(), discordIdOf(), dmUser(), loadPrefs(), sendWebhook()

## Knowledge Gaps
- **87 isolated node(s):** `v2 Screen: Landing / Hero`, `v2 Animated Bubble Field`, `v2 i18n Dictionary (FR/EN, landing-only)`, `v2 Language Switcher`, `Design Decision: v1 full SPA vs v2 landing-only` (+82 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Supabase client (supa / window.__supa)` connect `Deck swipe & profils` to `Boost & fetch Discord`, `Backend likes/match & bot`, `Checkout / paiement Boost`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Why does `state.user (live user model)` connect `Aperçu compte & vocal` to `Comptes, Auth & Boost UI`, `Messagerie & previews média`, `Statut & match (FAB)`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Why does `table profiles (discord_id)` connect `Backend likes/match & bot` to `Deck swipe & profils`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Tindord Landing page` (e.g. with `Supabase backend` and `Read chat transcripts first`) actually correct?**
  _`Tindord Landing page` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `Supabase client (supa / window.__supa)` (e.g. with `__discordJoinDM (auto-join + bot DM)` and `table profiles (discord_id)`) actually correct?**
  _`Supabase client (supa / window.__supa)` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Edge Function notify (index.ts)` (e.g. with `index.html recordLike() (insert likes)` and `Edge Function discord-join-dm (index.ts)`) actually correct?**
  _`Edge Function notify (index.ts)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `v2 Screen: Landing / Hero`, `v2 Animated Bubble Field`, `v2 i18n Dictionary (FR/EN, landing-only)` to the rest of the system?**
  _87 weakly-connected nodes found - possible documentation gaps or missing edges._