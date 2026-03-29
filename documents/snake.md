# App Store Submission — Classic Snake

## App Identity

| Field | Value |
|-------|-------|
| **App Name** | Classic Snake |
| **Subtitle** (30 chars max) | Classic Snake, Neon Style |
| **Bundle ID** | com.theze.snake |
| **SKU** | snake-001 |
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

File: `assets/images/icons/snake.png` (1024x1024, no alpha, no rounded corners)

## Description

### Promotional Text (170 chars max)
The classic snake game reimagined with stunning neon visuals. Swipe to move, eat to grow, and chase your highest score. How long can you survive?

### Full Description
Classic Snake brings the timeless arcade classic to your fingertips with a fresh, neon-infused visual style. Guide your snake across a glowing grid, collect food to grow longer, and avoid crashing into your own tail or the walls.

Simple to learn, impossible to master. Each game starts easy, but as your snake grows longer, every move becomes a strategic decision. One wrong swipe and it is game over.

FEATURES:
- Clean, responsive swipe controls optimised for mobile
- Stunning neon grid aesthetic with smooth animations
- Increasing difficulty as your snake grows
- Score tracking to beat your personal best
- Minimal, distraction-free gameplay
- No internet required to play

HOW TO PLAY:
Swipe in any direction to guide your snake. Eat the food that appears on the grid to grow longer and increase your score. Avoid hitting the walls or your own tail. The longer you survive, the higher your score.

Classic Snake is part of the Arcade Games collection, a series of fun, free arcade games designed for quick play sessions and endless replayability.

Download now and see how high you can score.

### Keywords (100 chars max)
snake,arcade,classic,neon,retro,puzzle,casual,swipe,highscore,free,simple,grid,grow,tail,fun

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
| **Contact Phone** | +91 8122726244 |
| **Demo Account** | Not required (no login) |
| **Review Notes** | This is a simple arcade game with no login, no in-app purchases, and no user-generated content. The game is ad-supported using the TopOn ad mediation SDK. Swipe in any direction to play. |

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

1. **Gameplay — Early stage**: Snake is short, food visible on the neon grid. Overlay text: "CLASSIC SNAKE REIMAGINED"
2. **Gameplay — Mid stage**: Snake is moderately long, weaving across the grid. Overlay text: "GROW LONGER, SCORE HIGHER"
3. **Gameplay — Late stage / Game Over**: Long snake with high score displayed. Overlay text: "HOW HIGH CAN YOU SCORE?"

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
eas build --profile snake-production --platform ios

# Submit to App Store Connect
eas submit --profile production --platform ios
```
