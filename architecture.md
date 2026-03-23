# Multi-Game React Native App — Architecture Guide

## Purpose & Goal

This project builds multiple simple mobile games using React Native (Expo SDK 54).
Each game is published as a separate app on the App Store / Play Store with its own
name, icon, splash, bundle ID, and store listing — all from a single codebase.

### Key design decisions:
- Single Expo app with `APP_VARIANT` env var switching identity at build time
- NOT a monorepo (no Turborepo/Nx/Yarn Workspaces)
- Ads via TopOn ADX (`react-native-topon`) — NOT AdMob
- Shared `GameOverScreen` component with standardized ad flow
- Firebase Hosting for privacy/terms/support pages (`theze-games.web.app`)

---

## Folder Structure

```
RNGames/
├── app/                          # Expo Router screens
│   ├── _layout.tsx               # Root layout — initializes ads
│   ├── index.tsx                 # Home screen — game grid
│   └── game/[id].tsx             # Dynamic game route
├── games/                        # All game implementations
│   ├── registry.ts               # Central game registry (allGames array)
│   ├── Snake/index.tsx           # Each game is a self-contained component
│   ├── MathRush/index.tsx
│   └── ...
├── shared/
│   ├── ads/AdManager.ts          # TopOn SDK init + showInterstitial/showRewarded
│   ├── components/
│   │   └── GameOverScreen.tsx    # Shared game-over UI (score, replay, main menu)
│   └── hooks/useGameLoop.ts      # RAF-based game loop with delta time
├── config/games.config.ts        # Variant detection from env vars
├── assets/images/icons/          # Per-game 1024x1024 app icons
├── documents/                    # App Store submission docs + icons
├── web/                          # Firebase Hosted site (privacy, terms, support)
├── patches/                      # patch-package patches (react-native-topon fixes)
├── app.config.js                 # Dynamic Expo config driven by APP_VARIANT
├── eas.json                      # EAS Build profiles (per-game preview + production)
├── firebase.json                 # Firebase Hosting config (public: "web")
├── PUBLISHING.md                 # Complete publishing guide with standard game pattern
└── RELEASE_TRACKER.md            # Per-game release status
```

---

## Standard Game Pattern

Every game MUST follow this pattern. See PUBLISHING.md for full details.

### Ad Flow

```
idle → [Rewarded Ad] → playing → game over → [Interstitial Ad] → GameOverScreen
                                                                    ├── Replay → playing (NO ad)
                                                                    └── Main Menu → home
```

### Required structure in every game component:

```typescript
import { showInterstitial, showRewarded } from '@/shared/ads/AdManager';
import GameOverScreen from '@/shared/components/GameOverScreen';

// 1. launchGame() — resets state, starts game (NO ad)
// 2. startGame() — called from idle only, shows rewarded ad then launchGame()
// 3. triggerGameOver() — sets phase='over', calls showInterstitial(), saves high score
// 4. Render <GameOverScreen onReplay={launchGame} /> when phase === 'over'
```

### Rules:
- `showRewarded()` only on FIRST play (phase === 'idle')
- `showInterstitial()` on every game over
- Replay = direct restart, NO ad (prevents double-ad problem)
- Use shared `GameOverScreen` — never custom game-over overlays
- AsyncStorage key: `@<game-id>/highscore` (must match registry.ts)

---

## Key Files

| File | Purpose |
|------|---------|
| `app.config.js` | Dynamic config: reads `APP_VARIANT`, sets name/icon/bundleId |
| `eas.json` | Per-game build profiles with TopOn credentials |
| `games/registry.ts` | Central registry of all 15 games |
| `shared/ads/AdManager.ts` | TopOn SDK wrapper (init, load, show) |
| `shared/components/GameOverScreen.tsx` | Shared game-over UI |
| `shared/hooks/useGameLoop.ts` | RAF game loop with delta time |
| `config/games.config.ts` | Variant detection from env |
| `patches/react-native-topon+0.1.7.patch` | Fixes GDPR type cast + removes CDN adapter deps |

---

## Adding a New Game — Checklist

1. Create `games/<GameName>/index.tsx` following the Standard Game Pattern
2. Register in `games/registry.ts` (id, name, component, color, storageKey)
3. Add variant to `VARIANTS` in `app.config.js`
4. Create icon at `assets/images/icons/<game>.png` (1024x1024, RGB, no alpha)
5. Add EAS project: `APP_VARIANT=<game> eas init --non-interactive --force`
6. Add project ID to `VARIANT_EAS_PROJECT_IDS` in `app.config.js`
7. Add `<game>-preview` and `<game>-production` profiles to `eas.json`
8. Create `documents/<game>.md` with App Store metadata
9. Test → Build → Submit (see PUBLISHING.md)

---

## Technology Stack

- **Framework**: React Native / Expo SDK 54 / expo-router
- **Ads**: TopOn ADX v6.4.93 via `react-native-topon@0.1.7` (patched)
- **Animation**: react-native-reanimated
- **Storage**: @react-native-async-storage/async-storage
- **Build**: EAS Build (cloud) with `autoIncrement` on production profiles
- **Hosting**: Firebase Hosting (`theze-games.web.app`)
- **iOS Deployment Target**: 17.0 (required by TPNiOS SDK)

---

## Rules & Constraints

- Use TypeScript throughout
- Each game in `games/<name>/` must be self-contained — no cross-game imports
- Shared components in `shared/` must be game-agnostic
- All TopOn ad credentials live in `eas.json` env blocks, never inline
- Bundle IDs follow pattern: `com.theze.<gameid>`
- Never add adapter pods to `react-native-topon` Podspec — only `TPNiOS` core
