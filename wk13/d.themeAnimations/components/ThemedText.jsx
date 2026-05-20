import React from 'react';
import Animated from 'react-native-reanimated';
import { useAnimatedThemeTextColor } from '../hooks/useTheme';

export default function ThemedText({
  colorKey = 'text',
  style,
  className,
  children,
  ...props
}) {
  const animatedStyle = useAnimatedThemeTextColor(colorKey);

  return (
    <Animated.Text className={className} style={[animatedStyle, style]} {...props}>
      {children}
    </Animated.Text>
  );
}
