# Publishing Guide — Arcade Games

This guide covers the complete process for building, submitting, and publishing any game from this monorepo to the Apple App Store. It is designed to be followed by a developer, AI assistant, or automated CI pipeline.

---

## Repository Structure

```
RNGames/
├── app/                      # Expo Router screens (shared game shell)
├── config/games.config.ts    # All 15 game variants with display names, colors
├── games/                    # Game implementations (one folder per game)
├── shared/
│   ├── ads/AdManager.ts      # TopOn ad SDK integration (ATT + interstitial + rewarded)
│   └── components/           # Shared UI: GameOverScreen, etc.
├── assets/images/icons/      # Per-game 1024x1024 app icons (PNG, RGB, no alpha)
├── app.config.js             # Dynamic Expo config — selects variant via APP_VARIANT env
├── eas.json                  # EAS Build profiles (per-game preview + production)
├── versions.json             # Per-game build number tracking
├── scripts/
│   ├── run-variant.js        # CLI entry point for all build commands
│   └── bump-build.js         # Auto-increments build number per game variant
├── patches/                  # patch-package fixes for third-party modules
├── documents/                # Per-game App Store submission metadata (*.md files)
├── web/                      # Firebase Hosted site (privacy, terms, support)
├── firebase.json             # Firebase Hosting config (serves from web/)
├── RELEASE_TRACKER.md        # Per-game release status checklist
└── PUBLISHING.md             # This file
```

---

## Prerequisites

1. **Apple Developer Account**: Team ID `HBSR239F25`, Account Holder: Rishi Kumar
2. **EAS CLI**: `npm install -g eas-cli && eas login`
3. **TopOn Account**: Dashboard at [topon.com](https://www.topon.com) with app entries created per game
4. **Firebase CLI**: `npm install -g firebase-tools && firebase login` (for hosting privacy/terms pages)
5. **Xcode**: Required for local iOS builds

---

## Versioning System

Build numbers are tracked **per game** in `versions.json`:

```json
{
  "snake": { "version": "1.0.0", "buildNumber": 8 },
  "math-rush": { "version": "1.0.0", "buildNumber": 7 },
  "circle-shrink": { "version": "1.0.0", "buildNumber": 1 }
}
```

The `scripts/bump-build.js` script increments only the target game's build number and writes it into `app.json` before each build. This works identically for both local and cloud EAS builds.

- **Automatic**: The build scripts (`run-variant.js`) auto-bump before every production/local build
- **Manual**: `npm run bump-build -- --variant=snake` or `npm run bump-build -- --variant=snake --set=10`

The `eas.json` uses `"appVersionSource": "local"` so versions always come from `app.json` (written by the bump script).

---

## How Bundle IDs Work

Each game has a unique bundle ID in `app.config.js`:

| Game | Bundle ID |
|------|-----------|
| Snake | `com.theze.snake` |
| Circle Shrink | `com.theze.circleshrink` |
| Laser Dodge | `com.theze.laserdodge` |
| Pulse Lanes | `com.theze.pulselanes` |
| Math Rush | `com.theze.mathrush` |
| Gravity Flip | `com.theze.gravityflip` |
| Color Clash | `com.theze.colorclash` |
| Stack Blocks | `com.theze.stackblocks` |
| Simon Says | `com.theze.simonsays` |
| Number Order | `com.theze.numberorder` |
| Tap Rhythm | `com.theze.taprhythm` |
| Brick Breaker | `com.theze.brickbreaker` |
| Slice Frenzy | `com.theze.slicefrenzy` |
| Tile Shift | `com.theze.tileshift` |
| Color Flood | `com.theze.colorflood` |

The `APP_VARIANT` env var tells `app.config.js` which variant to build. Each variant gets its own bundle ID, display name, icon, and ad unit IDs.

---

## Build Commands

### Production builds (App Store)

```bash
# Cloud EAS build (uses EAS servers, counts against build quota)
npm run build:game:ios -- --variant=snake

# Local build (uses your Mac, no quota limits)
npm run build:local:ipa -- --variant=snake
```

Both commands auto-increment the build number in `versions.json` before building.

### Preview / testing builds

```bash
npm run preview:game:ios -- --variant=snake
```

### Run in simulator (dev mode)

```bash
rm -rf ios   # clear stale prebuild if switching variants
APP_VARIANT=math-rush npx expo run:ios
```

### Submit to App Store

```bash
# Via EAS
APP_VARIANT=snake eas submit --profile snake-production --platform ios

# Or manually upload via Transporter app
```

---

## Publishing a New Game — Step by Step

### Step 1: Create App in App Store Connect

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Click "+" → "New App"
3. Fill in:
   - **Platform**: iOS
   - **Name**: `<Game Name> by Theze` (e.g. "Snake by Theze")
   - **Primary Language**: English (U.S.)
   - **Bundle ID**: Select `com.theze.<game>` (must match `app.config.js`)
   - **SKU**: `<game>-001`
4. Click "Create"

### Step 2: Create App in TopOn Dashboard

1. Log into [TopOn Dashboard](https://www.topon.com)
2. Create a new app for this game
3. Create two ad placements:
   - **Interstitial** → note the Placement ID
   - **Rewarded Video** → note the Placement ID
4. Note the **App ID** and **App Key**

### Step 3: Add Credentials to `eas.json`

Add two profiles to `eas.json` with real TopOn credentials:

```json
"<game>-preview": {
  "env": {
    "APP_VARIANT": "<game>",
    "EXPO_PUBLIC_APP_VARIANT": "<game>",
    "EXPO_PUBLIC_TOPON_APP_ID": "<TopOn App ID>",
    "EXPO_PUBLIC_TOPON_APP_KEY": "<TopOn App Key>",
    "EXPO_PUBLIC_TOPON_INTERSTITIAL_ID": "<Interstitial Placement ID>",
    "EXPO_PUBLIC_TOPON_REWARDED_ID": "<Rewarded Placement ID>"
  },
  "android": { "buildType": "apk" },
  "ios": { "distribution": "internal" }
},
"<game>-production": {
  "env": {
    "APP_VARIANT": "<game>",
    "EXPO_PUBLIC_APP_VARIANT": "<game>",
    "EXPO_PUBLIC_BUILD_ENV": "production",
    "EXPO_PUBLIC_TOPON_APP_ID": "<TopOn App ID>",
    "EXPO_PUBLIC_TOPON_APP_KEY": "<TopOn App Key>",
    "EXPO_PUBLIC_TOPON_INTERSTITIAL_ID": "<Interstitial Placement ID>",
    "EXPO_PUBLIC_TOPON_REWARDED_ID": "<Rewarded Placement ID>"
  },
  "android": { "buildType": "app-bundle" },
  "ios": {
    "distribution": "store",
    "image": "latest",
    "credentialsSource": "remote"
  }
}
```

### Step 4: Test on Device (Preview Build)

```bash
npm run preview:game:ios -- --variant=<game>
```

Install the IPA on a real device. Verify:
- [ ] App launches without crashes
- [ ] ATT permission dialog appears on first launch
- [ ] Game is playable
- [ ] Interstitial ad shows after game over
- [ ] Rewarded ad plays before first game start
- [ ] GameOverScreen shows with Replay + Main Menu buttons
- [ ] App icon is correct (not default Expo icon)

### Step 5: Build for Production

```bash
# Local build (recommended if EAS quota is limited)
npm run build:local:ipa -- --variant=<game>

# Or cloud build
npm run build:game:ios -- --variant=<game>
```

Build number auto-increments. Check `versions.json` to confirm.

### Step 6: Submit to App Store

Upload via **Transporter** app or:

```bash
APP_VARIANT=<game> eas submit --profile <game>-production --platform ios
```

### Step 7: Fill in App Store Connect Metadata

Use the game's document file (`documents/<game>.md`) to copy-paste:

1. **App Information tab**: Subtitle, category, content rating, Privacy Policy URL
2. **Version tab**: Screenshots, Description, Keywords, Promotional Text
3. **App Privacy tab**: Follow the Privacy Nutrition Label section in the doc
4. **Pricing tab**: Free

### Step 8: Submit for Review

Click "Submit for Review" in App Store Connect. Typical review time: 24-48 hours.

### Step 9: Update Release Tracker

Update `RELEASE_TRACKER.md` with the game's status.

---

## Adding a New Game to the Monorepo

When adding a brand new game (not yet in the codebase):

1. **Create game component** in `games/<GameName>/index.tsx`
   - Follow the Standard Game Pattern below

2. **Register in game registry** (`games/registry.ts`):
   - Add import and entry with id, name, component, description, color, icon, storageKey

3. **Add variant config** to `app.config.js`:
   - Add entry in `VARIANTS` with name, slug, bundleId, androidPackage, icon, splash, adaptiveForeground
   - Point icon/splash/adaptiveForeground to `./assets/images/icons/<game>.png`

4. **Create app icon**: Save as `assets/images/icons/<game>.png` (1024x1024 RGB, no alpha, no rounded corners)

5. **Add EAS profiles** to `eas.json`: `<game>-preview` and `<game>-production` profiles

6. **Add EAS project**: Run `APP_VARIANT=<game> eas init --non-interactive --force` and add the project ID to `VARIANT_EAS_PROJECT_IDS` in `app.config.js`

7. **Add to versions.json**: Add `"<game>": { "version": "1.0.0", "buildNumber": 0 }`

8. **Create submission doc**: Copy an existing `documents/<game>.md` and update all fields

9. **Update RELEASE_TRACKER.md**: Add the new game row

10. **Test → Build → Submit**: Follow Steps 4-9 from Publishing section

---

## Standard Game Pattern (MUST follow for all games)

Every game MUST implement this standardized pattern for ads, game-over flow, and scoring:

### Required Imports

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showInterstitial, showRewarded } from '@/shared/ads/AdManager';
import GameOverScreen from '@/shared/components/GameOverScreen';
import * as Haptics from 'expo-haptics';
```

### Game Phase Flow

```
idle → [Rewarded Ad] → playing → [game over] → [Interstitial Ad] → GameOverScreen
                                                                      ├── Replay → playing (no ad)
                                                                      └── Main Menu → home screen
```

### Required Functions (split start/replay)

```typescript
// launchGame — resets state and starts gameplay (NO ad)
const launchGame = useCallback(() => {
  // Reset all game state
  // Set phase to 'playing'
}, []);

// startGame — only called from idle screen, shows rewarded ad first
const startGame = useCallback(async () => {
  await showRewarded();
  launchGame();
}, [launchGame]);

// triggerGameOver — called when player loses
const triggerGameOver = useCallback(async () => {
  phaseRef.current = 'over';
  setPhase('over');
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  showInterstitial(); // fire-and-forget, plays after game over
  // Save high score to AsyncStorage
}, []);
```

### Game Over Screen (shared component)

Replace ALL custom game-over overlays with the shared `GameOverScreen`:

```tsx
{phase === 'over' && (
  <GameOverScreen
    score={score}
    highScore={highScore}
    accentColor="#00f5ff"       // match game's theme color
    onReplay={launchGame}       // direct restart, no ad
    // Optional for survival games:
    // scoreLabel="Time"
    // formatScore={(t) => `${t.toFixed(1)}s`}
  />
)}
```

### Ad Flow Rules

| Trigger | Ad Type | When |
|---------|---------|------|
| First play (idle → playing) | Rewarded | Before game starts |
| Game over | Interstitial | After phase set to 'over' |
| Replay (over → playing) | None | Direct restart, no ad |
| Main Menu | None | Just navigate back |

### AsyncStorage Key Convention

```typescript
const STORAGE_KEY = '@<game-id>/highscore';  // e.g. '@snake/highscore'
```

Must match the `storageKey` in `games/registry.ts`.

---

## URLs Reference

| Purpose | URL |
|---------|-----|
| Privacy Policy | `https://theze-games.web.app/privacy.html` |
| Terms of Service | `https://theze-games.web.app/terms.html` |
| Support | `https://theze-games.web.app/support.html` |
| Marketing | `https://theze-games.web.app/` |

---

## Common Issues

### Build number already used (Transporter / App Store Connect)
The build number in `versions.json` may be out of sync. Set it manually:
```bash
npm run bump-build -- --variant=snake --set=10
```

### App shows default Expo icon
- Verify `assets/images/icons/<game>.png` exists (1024x1024, RGB, no alpha)
- Verify `app.config.js` VARIANTS entry points to `./assets/images/icons/<game>.png`
- Delete `ios/` folder and rebuild: `rm -rf ios && npm run build:local:ipa -- --variant=<game>`

### Ads not showing in preview build
- TopOn native SDK requires a real device (not simulator)
- Verify TopOn credentials are in the profile's `env` block in `eas.json`
- Check that `initializeAds()` is called in `app/_layout.tsx`

### ATT dialog not appearing
- Only shows on iOS 14.5+ on a real device
- Only fires once per app install — delete and reinstall to test again

### App rejected for missing privacy policy
- Run `firebase deploy --only hosting` from the repo root to publish/update
- Verify URL loads: `https://theze-games.web.app/privacy.html`

### Local build fails with pod install error
- Delete `ios/` folder: `rm -rf ios`
- Clear CocoaPods cache: `cd ios && pod cache clean --all` (if ios/ exists)
- Rebuild: `npm run build:local:ipa -- --variant=<game>`

---

## Contact

- **Developer Account Holder**: Rishi Kumar
- **Email**: android.dev@theze.in
- **Apple Team ID**: HBSR239F25
