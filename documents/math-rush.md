# App Store Submission — Simpli - Math Rush

## App Identity

| Field | Value |
|-------|-------|
| **App Name** | Simpli - Math Rush |
| **Subtitle** (30 chars max) | Quick Math Under Pressure |
| **Bundle ID** | com.theze.mathrush |
| **SKU** | simpli-math-rush-001 |
| **Primary Category** | Games |
| **Secondary Category** | Education |
| **Content Rating** | 4+ |

## Version Info

| Field | Value |
|-------|-------|
| **Version** | 1.0.0 |
| **Build** | 1 |
| **Copyright** | 2026 Theze |
| **What's New** | Initial release |

## App Icon

File: `documents/icons/math-rush.png` (1024x1024, no alpha, no rounded corners)

## Description

### Promotional Text (170 chars max)
Solve math problems before time runs out. Addition, subtraction, and more — all against the clock. Train your brain while having fun.

### Full Description
Simpli - Math Rush is a fast-paced mental arithmetic game that challenges your brain under pressure. A math equation appears on screen with multiple answer choices. Pick the correct answer before the timer bar runs out.

Start with simple addition and subtraction. As you build a streak, the difficulty ramps up with larger numbers, multiplication, and tighter time limits. One wrong answer or one timeout ends your run.

FEATURES:
- Quick-fire math problems with multiple choice answers
- Progressive difficulty from basic arithmetic to challenging calculations
- Countdown timer bar that adds real pressure to every question
- Streak tracking and high score system
- Clean, bold number display that is easy to read
- Educational and entertaining for all ages
- No internet required to play

HOW TO PLAY:
A math equation appears at the top of the screen. Two or more answer options appear below. Tap the correct answer before the timer runs out. Each correct answer extends the timer and increases difficulty. One wrong answer or one timeout ends the game.

Simpli - Math Rush is part of the Simpli Games collection, a series of fun, free arcade games designed for quick play sessions and endless replayability. Perfect for sharpening your mental math skills during commutes, breaks, or any spare moment.

Download now and put your math skills to the test.

### Keywords (100 chars max)
math,quiz,brain,mental,arithmetic,numbers,education,speed,timer,quick,casual,free,simple,fun,rush

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
| **Review Notes** | This is a simple math quiz game with no login, no in-app purchases, and no user-generated content. The game is ad-supported using the TopOn ad mediation SDK. Tap the correct answer from the choices shown to play. |

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

1. **Gameplay — Easy question**: Simple addition (e.g. 7+5) with two answer buttons. Overlay text: "QUICK MATH UNDER PRESSURE"
2. **Gameplay — Hard question**: Larger numbers or multiplication with timer nearly empty. Overlay text: "TRAIN YOUR BRAIN"
3. **Score/streak screen**: High score and streak count displayed. Overlay text: "BEAT YOUR BEST STREAK"

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
eas build --profile math-rush-production --platform ios

# Submit to App Store Connect
eas submit --profile production --platform ios
```
