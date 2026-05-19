import { interpolateColor, useAnimatedStyle } from 'react-native-reanimated';
import { themeColorPair, themeColors } from '../theme/colors';
import { themeProgress } from '../utils/themeProgress';
import { useThemeStore } from '../store/useThemeStore';

export function useThemeColor(key) {
  const scheme = useThemeStore((s) => s.scheme);
  return themeColors[scheme][key];
}

export function useAnimatedThemeBackground(key) {
  const colors = themeColorPair(key);

  return useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(themeProgress.value, [0, 1], colors),
  }));
}

export function useAnimatedThemeTextColor(key = 'text') {
  const colors = themeColorPair(key);

  return useAnimatedStyle(() => ({
    color: interpolateColor(themeProgress.value, [0, 1], colors),
  }));
}
