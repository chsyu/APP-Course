import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider, Center } from 'native-base';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler } from 'react-native-reanimated';
import { PanGestureHandler } from "react-native-gesture-handler";

export default function App() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const translateXOLD = useSharedValue(0);
  const translateYOLD = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX + translateXOLD.value;
      translateY.value = event.translationY + translateYOLD.value;
    },
    onEnd: (event) => {
      // translateX.value = withSpring(0);
      // translateY.value = withSpring(0);
      translateXOLD.value = translateX.value;
      translateYOLD.value = translateY.value;
    },
  });

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Center flex={1}>
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.Image
              style={[{
                width: 150,
                height: 150,
                borderRadius: 100,
              }, animatedStyles]}
              source={require("./assets/splash.png")}
            />
          </PanGestureHandler>
        </Center>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
