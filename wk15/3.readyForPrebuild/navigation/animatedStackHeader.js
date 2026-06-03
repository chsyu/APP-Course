import AnimatedStackHeaderBackground from '../components/AnimatedStackHeaderBackground';

export const transparentStackHeaderStyle = {
  backgroundColor: 'transparent',
  elevation: 0,
  shadowOpacity: 0,
  shadowOffset: { width: 0, height: 0 },
  shadowRadius: 0,
};

export function animatedStackHeaderOptions(headerColor) {
  return {
    headerStyle: transparentStackHeaderStyle,
    headerBackground: () => <AnimatedStackHeaderBackground />,
    headerTintColor: headerColor,
    headerTitleStyle: { color: headerColor },
    headerShadowVisible: false,
  };
}
