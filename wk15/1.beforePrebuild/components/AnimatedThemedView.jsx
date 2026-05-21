import React from 'react';
import Animated from 'react-native-reanimated';
import { useAnimatedThemeBackground } from '../hooks/useTheme';

export default function AnimatedThemedView({
  colorKey = 'screen',
  style,
  className,
  children,
}) {
  const animatedStyle = useAnimatedThemeBackground(colorKey);

  return (
    <Animated.View className={className} style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
}
