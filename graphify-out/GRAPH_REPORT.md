# Graph Report - .  (2026-05-22)

## Corpus Check
- 1 files · ~24,468 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 99 nodes · 123 edges · 11 communities (10 shown, 1 thin omitted)
- Extraction: 80% EXTRACTED · 20% INFERRED · 0% AMBIGUOUS · INFERRED: 25 edges (avg confidence: 0.82)
- Token cost: 70,083 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Profil & Identity (Account)|Profil & Identity (Account)]]
- [[_COMMUNITY_Match & Likes Flow|Match & Likes Flow]]
- [[_COMMUNITY_Account UI & Save Flow|Account UI & Save Flow]]
- [[_COMMUNITY_Landing & Screen Routing|Landing & Screen Routing]]
- [[_COMMUNITY_Auth & Discord Identity|Auth & Discord Identity]]
- [[_COMMUNITY_Music Orbs & Search|Music Orbs & Search]]
- [[_COMMUNITY_Bulles Physics & Previews|Bulles Physics & Previews]]
- [[_COMMUNITY_v2 Landing Variant|v2 Landing Variant]]
- [[_COMMUNITY_Boost (Premium)|Boost (Premium)]]
- [[_COMMUNITY_Looking-for Status|Looking-for Status]]
- [[_COMMUNITY_Discord Server FAB|Discord Server FAB]]

## God Nodes (most connected - your core abstractions)
1. `Swipe Deck & Drag` - 9 edges
2. `state.user (live user model)` - 9 edges
3. `Discord OAuth Module` - 8 edges
4. `Tindord Application (v2 Landing)` - 7 edges
5. `Account Screen` - 7 edges
6. `Account Render & Preview` - 7 edges
7. `Profile Orbs (Bubbles)` - 6 edges
8. `Swipe Screen` - 5 edges
9. `Discord Badge Picker` - 5 edges
10. `Boost Plan (Tindord Boost)` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Landing Screen (Hero)` --references--> `Auth Modal (Providers + Email)`  [INFERRED]
  index.html → index.html  _Bridges community 3 → community 4_
- `Swipe Screen` --references--> `Messages Panel & FAB`  [INFERRED]
  index.html → index.html  _Bridges community 5 → community 2_
- `Boost Modal (2-col upsell)` --conceptually_related_to--> `Boost Tab (2-col layout)`  [INFERRED]
  index.html → index.html  _Bridges community 8 → community 1_
- `Badge FAB (looking_for picker)` --references--> `Forbidden UI Zones (nav/FAB exclusion)`  [INFERRED]
  index.html → index.html  _Bridges community 9 → community 1_
- `Swipe Screen` --references--> `Swipe Deck & Drag`  [EXTRACTED]
  index.html → index.html  _Bridges community 5 → community 3_

## Communities (11 total, 1 thin omitted)

### Community 0 - "Profil & Identity (Account)"
Cohesion: 0.21
Nodes (12): Account Live Profile Preview, Account Voice Player Widget, Archive/Restore on Discord Reconnect, Age+Gender Badge Below Banner, Card Voice Playing State (data-playing), Swipe Card Voice Memo Widget, Dirty-State Tracking Pattern, Onboarding Genre (3 options + skip link) (+4 more)

### Community 1 - "Match & Likes Flow"
Cohesion: 0.21
Nodes (12): Boost Tab (2-col layout), CONVOS Array (chat threads), createMatchFromLiker() Function, Fly-to-FAB Animation Pattern, Forbidden UI Zones (nav/FAB exclusion), Heart FAB (likes received), LIKED_ME Array, Liked-Me List (blurred non-boost) (+4 more)

### Community 2 - "Account UI & Save Flow"
Cohesion: 0.2
Nodes (11): Messages Panel & FAB, Account Render & Preview, Account Floating Save Bar, Discord Resync Button, Messages/Chat Module, Background backfill of orb covers, Dirty-state tracking via JSON snapshot, Floating Action Button (FAB) pattern (+3 more)

### Community 3 - "Landing & Screen Routing"
Cohesion: 0.18
Nodes (11): Language Switcher, Bubble Field (Landing Physics), i18n / Language Module, Swipe Deck & Drag, Conic-gradient Nitro avatar ring, setScreen() single-page screen switcher, Landing Screen (Hero), Onboarding Screen (+3 more)

### Community 4 - "Auth & Discord Identity"
Cohesion: 0.22
Nodes (11): Auth Modal (Providers + Email), Badge Picker Panel, Header & Brand Nav, Discord Badge Picker, Discord OAuth Module, Supabase Auth Module, Discord CDN URL builders (banner/avatar/deco), localStorage Discord token fallback (+3 more)

### Community 5 - "Music Orbs & Search"
Cohesion: 0.2
Nodes (11): Anime/Wiki Search, iTunes Preview Fallback, Orb Music Player (fade), Profile Orbs (Bubbles), Spotify Search Integration, Swipe Background Music Player, 6-orb orbital layout around swipe card, Swipe Screen (+3 more)

### Community 6 - "Bulles Physics & Previews"
Cohesion: 0.18
Nodes (11): Bulles Mouse Repulsion, Bulles Fullscreen Orbit Module, Bulles Pairwise Collision (elastic), Bulles Physics Simulation (drift+repulsion+collision), Deezer Preview Fallback (JSONP), GAME_COVER_OVERRIDES Map, Image Transparency Detection, iTunes Preview Fallback (+3 more)

### Community 7 - "v2 Landing Variant"
Cohesion: 0.29
Nodes (8): External API: Google OAuth2 (v2 only), Design Decision: v1 full SPA vs v2 landing-only, v2 Auth Modal (Discord + Google + Email), v2 Animated Bubble Field, v2 i18n Dictionary (FR/EN, landing-only), v2 Language Switcher, v2 Screen: Landing / Hero, Tindord Application (v2 Landing)

### Community 8 - "Boost (Premium)"
Cohesion: 0.29
Nodes (7): Boost Banner (outside acc-card), Boost Modal (2-col upsell), Liked Me Panel (Boost), Boost Plan (Tindord Boost), Giphy GIF Search & Stage, state.user.boost / boostPlan, state.user.gifs

### Community 9 - "Looking-for Status"
Cohesion: 0.67
Nodes (4): Badge FAB (looking_for picker), Badge FAB Popup (chill/game/talk/sleep), looking_for Selector (4 values), My Status Button + Popup

## Knowledge Gaps
- **39 isolated node(s):** `v2 Screen: Landing / Hero`, `v2 Animated Bubble Field`, `v2 i18n Dictionary (FR/EN, landing-only)`, `v2 Language Switcher`, `Design Decision: v1 full SPA vs v2 landing-only` (+34 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `state.user (live user model)` connect `Profil & Identity (Account)` to `Match & Likes Flow`, `Account UI & Save Flow`, `Landing & Screen Routing`, `Auth & Discord Identity`, `Music Orbs & Search`?**
  _High betweenness centrality (0.416) - this node is a cross-community bridge._
- **Why does `Match Animation Overlay` connect `Match & Likes Flow` to `Profil & Identity (Account)`?**
  _High betweenness centrality (0.224) - this node is a cross-community bridge._
- **Why does `Forbidden UI Zones (nav/FAB exclusion)` connect `Match & Likes Flow` to `Looking-for Status`, `Bulles Physics & Previews`?**
  _High betweenness centrality (0.200) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `state.user (live user model)` (e.g. with `Onboarding Genre (3 options + skip link)` and `Age+Gender Badge Below Banner`) actually correct?**
  _`state.user (live user model)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `v2 Screen: Landing / Hero`, `v2 Animated Bubble Field`, `v2 i18n Dictionary (FR/EN, landing-only)` to the rest of the system?**
  _39 weakly-connected nodes found - possible documentation gaps or missing edges._