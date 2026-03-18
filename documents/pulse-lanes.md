# App Store Submission — Simpli - Pulse Lanes

## App Identity

| Field | Value |
|-------|-------|
| **App Name** | Simpli - Pulse Lanes |
| **Subtitle** (30 chars max) | Switch Lanes, Dodge Pulses |
| **Bundle ID** | com.theze.pulselanes |
| **SKU** | simpli-pulse-lanes-001 |
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

File: `documents/icons/pulse-lanes.png` (1024x1024, no alpha, no rounded corners)

## Description

### Promotional Text (170 chars max)
Three lanes, endless obstacles, one goal: survive. Tap to switch lanes and dodge the incoming pulses. A rhythm-driven arcade runner that never stops.

### Full Description
Simpli - Pulse Lanes is an endless arcade runner where you switch between three lanes to avoid incoming obstacles. Tap left or right to change lanes, time your moves carefully, and survive as long as possible.

Obstacles come in waves with rhythm-like patterns. Learn the patterns, anticipate the pulses, and react faster as the speed increases. One collision and the run is over.

FEATURES:
- Three-lane switching with responsive tap controls
- Rhythmic obstacle patterns that feel satisfying to dodge
- Vibrant neon visuals with cyan, pink, and green lane colours
- Progressively increasing speed for escalating challenge
- Score tracking based on distance survived
- Clean, focused design with no clutter
- No internet required to play

HOW TO PLAY:
Your character moves forward automatically in one of three lanes. Tap the left side of the screen to move left, or the right side to move right. Dodge the pulse obstacles that appear in each lane. The longer you survive, the faster the pulses come. Time your lane switches to weave through the patterns.

Simpli - Pulse Lanes is part of the Simpli Games collection, a series of fun, free arcade games designed for quick play sessions and endless replayability.

Download now and ride the pulse.

### Keywords (100 chars max)
lanes,dodge,runner,endless,pulse,arcade,rhythm,switch,tap,neon,casual,free,simple,obstacle,speed

## URLs

| Field | Value |
|-------|-------|
| **Support URL** | https://aswin-dot.github.io/RNGames/support.html |
| **Marketing URL** | https://aswin-dot.github.io/RNGames/ |
| **Privacy Policy URL** | https://aswin-dot.github.io/RNGames/privacy.html |

## App Review Information

| Field | Value |
|-------|-------|
| **Contact First Name** | Rishi |
| **Contact Last Name** | Kumar |
| **Contact Email** | android.dev@theze.in |
| **Contact Phone** | +91 (update with actual number) |
| **Demo Account** | Not required (no login) |
| **Review Notes** | This is a simple arcade game with no login, no in-app purchases, and no user-generated content. The game is ad-supported using the TopOn ad mediation SDK. Tap left or right side of the screen to switch between three lanes and dodge obstacles. |

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

1. **Gameplay — Lane switching**: Player in middle lane with obstacles in side lanes. Overlay text: "SWITCH LANES, DODGE PULSES"
2. **Gameplay — High speed**: Obstacles coming fast, player weaving between lanes. Overlay text: "RHYTHM-DRIVEN ARCADE ACTION"
3. **Score screen**: Distance and score after a run. Overlay text: "HOW FAR CAN YOU GO?"

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
eas build --profile pulse-lanes-production --platform ios

# Submit to App Store Connect
eas submit --profile production --platform ios
```
