import { makeMutable, withTiming } from 'react-native-reanimated';

export const THEME_ANIMATION_DURATION_MS = 1000;

/** Shared 0 (light) → 1 (dark); lives outside React / Zustand. */
export const themeProgress = makeMutable(0);

export function animateThemeProgress(isDark) {
  themeProgress.value = withTiming(isDark ? 1 : 0, {
    duration: THEME_ANIMATION_DURATION_MS,
  });
}

export function setThemeProgressInstant(isDark) {
  themeProgress.value = isDark ? 1 : 0;
}
