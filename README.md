# React Native Arcade

> 15 mobile games. One codebase. Each is published as its own App Store app.

A production React Native monorepo built with Expo SDK 54. Every game ships as an independent iOS app — its own name, icon, bundle ID, and store listing — all from a single shared codebase. Built, shipped, and maintained solo.

**15 games in one codebase** · React Native · Expo SDK 54 · TopOn Ads · EAS Build · Firebase Hosting

---

## The Architecture in One Line

`APP_VARIANT=snake` → builds Snake as `com.theze.snake` with its own icon, ads, and store listing. Switch the env var, get a different app. Same code, 15 identities.

---

## Games

| Game | Bundle ID | Category |
|------|-----------|----------|
| Snake | `com.theze.snake` | Classic |
| Math Rush | `com.theze.mathrush` | Puzzle |
| Circle Shrink | `com.theze.circleshrink` | Arcade |
| Laser Dodge | `com.theze.laserdodge` | Action |
| Pulse Lanes | `com.theze.pulselanes` | Rhythm |
| Gravity Flip | `com.theze.gravityflip` | Arcade |
| Color Clash | `com.theze.colorclash` | Reflex |
| Stack Blocks | `com.theze.stackblocks` | Classic |
| Simon Says | `com.theze.simonsays` | Memory |
| Number Order | `com.theze.numberorder` | Puzzle |
| Tap Rhythm | `com.theze.taprhythm` | Rhythm |
| Brick Breaker | `com.theze.brickbreaker` | Classic |
| Slice Frenzy | `com.theze.slicefrenzy` | Action |
| Tile Shift | `com.theze.tileshift` | Puzzle |
| Color Flood | `com.theze.colorflood` | Strategy |

---

## Project Structure

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
│   └── ...                       # 13 more games
├── shared/
│   ├── ads/AdManager.ts          # TopOn SDK wrapper — init, interstitial, rewarded
│   ├── components/
│   │   └── GameOverScreen.tsx    # Shared game-over UI used by every game
│   └── hooks/useGameLoop.ts      # RAF-based game loop with delta time
├── config/games.config.ts        # Variant detection from env vars
├── assets/images/icons/          # Per-game 1024x1024 app icons
├── documents/                    # Per-game App Store submission metadata
├── web/                          # Firebase Hosted site (privacy, terms, support)
├── app.config.js                 # Dynamic Expo config driven by APP_VARIANT
├── eas.json                      # EAS Build profiles — per-game preview + production
├── versions.json                 # Per-game build number tracking
├── PUBLISHING.md                 # Complete step-by-step publishing guide
└── RELEASE_TRACKER.md            # Per-game release status
```

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | React Native + Expo SDK 54 | Single codebase, fast builds |
| Routing | expo-router | File-based, simple game navigation |
| Ads | TopOn ADX via `react-native-topon` | Better fill rates than AdMob for casual games |
| Animation | react-native-reanimated | Smooth 60fps game animations |
| Storage | AsyncStorage | Per-game high score persistence |
| Build | EAS Build (cloud) | Per-game profiles, no local Xcode required |
| Hosting | Firebase Hosting | Privacy, terms, support pages |
| Patching | patch-package | Fixes GDPR type cast + removes CDN adapter deps in TopOn |

---

## How Variants Work

Each game is a "variant" — a different identity built from the same source code.

`app.config.js` reads `APP_VARIANT` at build time and configures:
- App name (`Snake`)
- Bundle ID (`com.theze.snake`)
- App icon
- Splash screen
- EAS project ID

`eas.json` holds per-game build profiles with TopOn ad credentials injected via env vars — never hardcoded.

`versions.json` tracks build numbers independently per game so bumping Snake's build number doesn't affect Math Rush.

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli && eas login`
- For iOS builds: Xcode + Apple Developer Account

### Install

```bash
git clone https://github.com/Aswin-Dot/Arcade-Games.git
cd RNGames
npm install
```

### Run a game in the simulator

```bash
# Clear stale prebuild if switching variants
rm -rf ios

# Run Snake in iOS simulator
APP_VARIANT=snake npx expo run:ios

# Run Math Rush
APP_VARIANT=math-rush npx expo run:ios
```

---

## Build & Deploy

### Preview build (test on device)

```bash
npm run preview:game:ios -- --variant=snake
```

### Production build (App Store)

```bash
# Cloud build via EAS
npm run build:game:ios -- --variant=snake

# Local build (no EAS quota used)
npm run build:local:ipa -- --variant=snake
```

Build number auto-increments per game before every production build. Check `versions.json` to confirm.

### Submit to App Store

```bash
APP_VARIANT=snake eas submit --profile snake-production --platform ios
```

Or upload the `.ipa` manually via Transporter.

---

## Standard Game Pattern

Every game follows the same structure. This is enforced to keep ads, game-over flow, and scoring consistent across all 15 games.

### Ad flow

```
idle → [Rewarded Ad] → playing → game over → [Interstitial Ad] → GameOverScreen
                                                                    ├── Replay → playing (no ad)
                                                                    └── Main Menu → home
```

### Required functions

```typescript
// launchGame — resets state and starts gameplay, NO ad
const launchGame = useCallback(() => { ... }, []);

// startGame — only called from idle, shows rewarded ad first
const startGame = useCallback(async () => {
  await showRewarded();
  launchGame();
}, [launchGame]);

// triggerGameOver — sets phase, fires interstitial, saves high score
const triggerGameOver = useCallback(async () => {
  phaseRef.current = 'over';
  setPhase('over');
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  showInterstitial(); // fire-and-forget
  await AsyncStorage.setItem(STORAGE_KEY, String(score));
}, []);
```

### Game over screen

Every game uses the shared `GameOverScreen` — no custom overlays:

```tsx
{phase === 'over' && (
  <GameOverScreen
    score={score}
    highScore={highScore}
    accentColor="#00f5ff"   // match your game's theme color
    onReplay={launchGame}   // direct restart, no ad
  />
)}
```

### AsyncStorage key convention

```typescript
const STORAGE_KEY = '@snake/highscore'; // matches registry.ts storageKey
```

---

## Adding a New Game

1. Create `games/<GameName>/index.tsx` following the Standard Game Pattern
2. Register in `games/registry.ts` — id, name, component, color, storageKey
3. Add variant to `VARIANTS` in `app.config.js`
4. Create icon at `assets/images/icons/<game>.png` (1024×1024, RGB, no alpha)
5. Run `APP_VARIANT=<game> eas init --non-interactive --force`
6. Add project ID to `VARIANT_EAS_PROJECT_IDS` in `app.config.js`
7. Add `<game>-preview` and `<game>-production` profiles to `eas.json`
8. Add entry to `versions.json`: `"<game>": { "version": "1.0.0", "buildNumber": 0 }`
9. Create `documents/<game>.md` with App Store metadata
10. Test → Build → Submit (see [PUBLISHING.md](./PUBLISHING.md))

---

## Versioning

Build numbers are tracked per game in `versions.json`:

```json
{
  "snake": { "version": "1.0.0", "buildNumber": 8 },
  "math-rush": { "version": "1.0.0", "buildNumber": 7 }
}
```

Bump manually:
```bash
npm run bump-build -- --variant=snake
npm run bump-build -- --variant=snake --set=10
```

Auto-bumps before every production build via `scripts/bump-build.js`.

---

## URLs

| Purpose | URL |
|---------|-----|
| Privacy Policy | https://theze-games.web.app/privacy.html |
| Terms of Service | https://theze-games.web.app/terms.html |
| Support | https://theze-games.web.app/support.html |

Deploy updates:
```bash
firebase deploy --only hosting
```

---

## Common Issues

**Build number already used in App Store Connect**
```bash
npm run bump-build -- --variant=snake --set=<higher number>
```

**App shows default Expo icon**
- Verify `assets/images/icons/<game>.png` exists (1024×1024, RGB, no alpha, no rounded corners)
- Delete stale prebuild: `rm -rf ios && npm run build:local:ipa -- --variant=<game>`

**Ads not showing on device**
- TopOn requires a real device — simulator won't show ads
- Verify TopOn credentials are in the correct `eas.json` profile env block
- Confirm `initializeAds()` is called in `app/_layout.tsx`

**ATT dialog not appearing**
- Only fires once per install — delete and reinstall to test again
- Only appears on iOS 14.5+ on a real device

**Local build fails at pod install**
```bash
rm -rf ios
npm run build:local:ipa -- --variant=<game>
```

For full publishing steps, troubleshooting, and App Store Connect setup, see [PUBLISHING.md](./PUBLISHING.md).

---

## What I learned building this

Shipping 15 apps from one codebase forces decisions that a single-app developer never faces:

- **Variant isolation** — any shared state or global side effect breaks all 15 apps at once. Everything game-specific stays inside its folder.
- **Ad flow discipline** — showing the wrong ad at the wrong moment (double ads on replay, missing rewarded on first play) tanks retention. The standard pattern exists because I broke it multiple times before locking it down.
- **Build number hygiene** — EAS and App Store Connect will reject a build if the number isn't strictly incrementing per bundle ID. Per-game tracking in `versions.json` was the only way to manage this without a spreadsheet.
- **Patch-package over forking** — `react-native-topon` had a GDPR type cast bug and unnecessary CDN adapter dependencies. Patching in-place kept the dependency graph clean without maintaining a fork.

---

## License

MIT

---

*Built by [Aswin Raj](https://github.com/Aswin-Dot)*
