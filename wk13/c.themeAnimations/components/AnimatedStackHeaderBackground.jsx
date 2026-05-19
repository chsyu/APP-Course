import Animated from 'react-native-reanimated';
import { useAnimatedThemeBackground } from '../hooks/useTheme';

export default function AnimatedStackHeaderBackground() {
  const style = useAnimatedThemeBackground('primary');

  return <Animated.View style={[{ flex: 1 }, style]} />;
}
