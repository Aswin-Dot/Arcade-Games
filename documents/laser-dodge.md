# App Store Submission — Simpli - Laser Dodge

## App Identity

| Field | Value |
|-------|-------|
| **App Name** | Simpli - Laser Dodge |
| **Subtitle** (30 chars max) | Dodge Lasers, Stay Alive |
| **Bundle ID** | com.theze.laserdodge |
| **SKU** | simpli-laser-dodge-001 |
| **Primary Category** | Games |
| **Secondary Category** | Entertainment |
| **Content Rating** | 4+ |

## Version Info

| Field | Value |
|-------|-------|
| **Version** | 1.0.0 |
| **Build** | 1 |
| **Copyright** | 2026 Theze |
| **What's New** | Initial release |

## App Icon

File: `documents/icons/laser-dodge.png` (1024x1024, no alpha, no rounded corners)

## Description

### Promotional Text (170 chars max)
Lasers are closing in from every direction. Drag to dodge, survive as long as you can. A thrilling arcade challenge that gets harder every second.

### Full Description
Simpli - Laser Dodge drops you into an arena where laser beams fire from all four edges of the screen. Your only defence is your reflexes. Drag your character to weave through the gaps and survive as long as possible.

As time passes, lasers fire faster, gaps shrink, and new beam patterns emerge. Every second you survive pushes your score higher. One hit and it is game over.

FEATURES:
- Intense drag-to-dodge gameplay with precise touch controls
- Laser beams from all four edges with increasingly complex patterns
- Smooth neon visuals with a dark sci-fi aesthetic
- Progressive difficulty that ramps up every few seconds
- Score tracking to beat your personal best
- Minimal, distraction-free design
- No internet required to play

HOW TO PLAY:
Drag your character around the screen to avoid the incoming laser beams. Lasers fire from the top, bottom, left, and right edges. Watch for the warning indicators that show where the next laser will appear. Survive as long as you can to achieve the highest score.

Simpli - Laser Dodge is part of the Simpli Games collection, a series of fun, free arcade games designed for quick play sessions and endless replayability.

Download now and see how long you can dodge.

### Keywords (100 chars max)
laser,dodge,avoid,arcade,reflex,neon,sci-fi,survival,drag,action,casual,free,simple,fast,beams

## URLs

| Field | Value |
|-------|-------|
| **Support URL** | https://theze-games.web.app/support.html |
| **Marketing URL** | https://theze-games.web.app/ |
| **Privacy Policy URL** | https://theze-games.web.app/privacy.html |

## App Review Information

| Field | Value |
|-------|-------|
| **Contact First Name** | Rishi |
| **Contact Last Name** | Kumar |
| **Contact Email** | android.dev@theze.in |
| **Contact Phone** | +91 (update with actual number) |
| **Demo Account** | Not required (no login) |
| **Review Notes** | This is a simple arcade game with no login, no in-app purchases, and no user-generated content. The game is ad-supported using the TopOn ad mediation SDK. Drag anywhere on screen to move your character and dodge the lasers. |

## Age Rating Questionnaire

| Question | Answer |
|----------|--------|
| Cartoon or Fantasy Violence | None |
| Realistic Violence | None |
| Prolonged Graphic or Sadistic Violence | None |
| Profanity or Crude Humour | None |
| Mature/Suggestive Themes | None |
| Horror/Fear Themes | None |
| Medical/Treatment Information | None |
| Alcohol, Tobacco, or Drug Use | None |
| Simulated Gambling | None |
| Sexual Content or Nudity | None |
| Unrestricted Web Access | No |
| Gambling and Contests | No |

**Result: 4+**

## Screenshots Required

| Device | Size (pixels) | Count |
|--------|--------------|-------|
| iPhone 6.9" (iPhone 16 Pro Max) | 1320 x 2868 | 3-10 |
| iPhone 6.7" (iPhone 14 Pro Max) | 1290 x 2796 | 3-10 |
| iPad Pro 13" | 2064 x 2752 | 3-10 |

### Screenshot Content Guide

1. **Gameplay — Lasers firing**: Multiple laser beams crossing the arena, player dodging. Overlay text: "DODGE LASERS FROM ALL SIDES"
2. **Gameplay — Close call**: Player narrowly avoiding intersecting beams. Overlay text: "SURVIVE THE LASER STORM"
3. **Game over**: Score display with laser-filled background. Overlay text: "HOW LONG CAN YOU LAST?"

## Pricing

| Field | Value |
|-------|-------|
| **Price** | Free |
| **In-App Purchases** | None |
| **Ads** | Yes (interstitial + rewarded via TopOn) |

## App Privacy (Data Collection)

| Data Type | Collected | Linked to User | Used for Tracking |
|-----------|-----------|-----------------|-------------------|
| Advertising Data (Ad interactions) | Yes | No | Yes (if ATT granted) |
| Device ID (IDFA) | Yes (with consent) | No | Yes (if ATT granted) |
| Usage Data (game sessions) | Yes | No | No |
| Diagnostics (crash logs) | Yes | No | No |

**Privacy Nutrition Label**: Select "Data Used to Track You" → Advertising Data, Device ID (only if ATT granted). Select "Data Not Linked to You" → Usage Data, Diagnostics.

## Build & Submit Commands

```bash
# Build production IPA
eas build --profile laser-dodge-production --platform ios

# Submit to App Store Connect
eas submit --profile production --platform ios
```
