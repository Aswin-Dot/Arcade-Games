/**
 * AdManager — handles ad initialisation, ATT permission (iOS 14+), and
 * interstitial lifecycle for all 15 game variants.
 *
 * Ad stack:
 *   • react-native-google-mobile-ads  — JS/RN bridge (AdMob)
 *   • TopOn ADX CocoaPods (iOS)       — native mediation layer on top of AdMob
 *     The TopOn native SDK mediates across 15+ networks automatically;
 *     the JS layer only talks to the AdMob bridge as usual.
 *
 * ATT flow (iOS 14+):
 *   requestTrackingPermission() → MobileAds.initialize() → loadInterstitial()
 */

import { Platform } from 'react-native';

import { currentGameConfig } from '@/config/games.config';

// Lazy-load to avoid crashing on web / simulator where native module is absent
type AdsLib = typeof import('react-native-google-mobile-ads');
let adsLib: AdsLib | null = null;

type TrackingLib = typeof import('expo-tracking-transparency');
let trackingLib: TrackingLib | null = null;

let interstitial: ReturnType<AdsLib['InterstitialAd']['createForAdRequest']> | null = null;
let interstitialReady = false;
let initialized = false;

// ─── helpers ──────────────────────────────────────────────────────────────────

function getAdsLib(): AdsLib | null {
  if (adsLib) return adsLib;
  if (Platform.OS === 'web') return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    adsLib = require('react-native-google-mobile-ads') as AdsLib;
    return adsLib;
  } catch {
    return null;
  }
}

function getTrackingLib(): TrackingLib | null {
  if (trackingLib) return trackingLib;
  if (Platform.OS !== 'ios') return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    trackingLib = require('expo-tracking-transparency') as TrackingLib;
    return trackingLib;
  } catch {
    return null;
  }
}

// ─── ATT permission ───────────────────────────────────────────────────────────

/**
 * Requests App Tracking Transparency permission on iOS 14+.
 * Must be called BEFORE initialising any ad SDK.
 * On Android and web this is a no-op.
 */
async function requestTrackingPermission(): Promise<void> {
  if (Platform.OS !== 'ios') return;
  const tracking = getTrackingLib();
  if (!tracking) return;
  try {
    const { status } = await tracking.requestTrackingPermissionsAsync();
    // status is 'granted' | 'denied' | 'undetermined'
    // We continue regardless — AdMob works in limited-ad-targeting mode when denied
    console.log('[AdManager] ATT status:', status);
  } catch (e) {
    console.warn('[AdManager] ATT request failed:', e);
  }
}

// ─── interstitial lifecycle ───────────────────────────────────────────────────

function loadInterstitial(): void {
  const ads = getAdsLib();
  if (!ads) return;

  const unitId = currentGameConfig.adUnits.interstitial;
  interstitial = ads.InterstitialAd.createForAdRequest(unitId, {
    requestNonPersonalizedAdsOnly: false,
  });
  interstitialReady = false;

  interstitial.addAdEventListener(ads.AdEventType.LOADED, () => {
    interstitialReady = true;
  });

  interstitial.addAdEventListener(ads.AdEventType.CLOSED, () => {
    interstitialReady = false;
    loadInterstitial(); // pre-load next ad
  });

  interstitial.addAdEventListener(ads.AdEventType.ERROR, (error) => {
    console.warn('[AdManager] Interstitial error:', error);
    interstitialReady = false;
  });

  interstitial.load();
}

// ─── public API ───────────────────────────────────────────────────────────────

/**
 * Call once at app startup (e.g. in _layout.tsx useEffect).
 * Requests ATT → initialises MobileAds → pre-loads first interstitial.
 */
export async function initializeAds(): Promise<void> {
  if (initialized) return;

  // Step 1: ATT permission (iOS only, must come first)
  await requestTrackingPermission();

  // Step 2: Init AdMob (TopOn native SDK is initialised automatically via CocoaPods)
  const ads = getAdsLib();
  if (!ads) {
    initialized = true;
    return;
  }

  try {
    await ads.MobileAds().initialize();
    loadInterstitial();
    initialized = true;
  } catch (e) {
    console.warn('[AdManager] MobileAds init failed:', e);
    initialized = false;
  }
}

/**
 * Show an interstitial ad if one is loaded.
 * Resolves when the user closes the ad (or immediately if no ad is ready).
 * Call this at natural break-points — e.g. after game-over before showing score.
 */
export async function showInterstitial(): Promise<void> {
  const ads = getAdsLib();
  if (!ads || !interstitial || !interstitialReady) return;

  await new Promise<void>((resolve) => {
    const unsub = interstitial!.addAdEventListener(ads.AdEventType.CLOSED, () => {
      unsub();
      resolve();
    });
    interstitial!.show();
  });
}

/**
 * Returns true if an interstitial is loaded and ready to display.
 */
export function isInterstitialReady(): boolean {
  return interstitialReady;
}
