import { useEffect, useState } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider, Center } from 'native-base';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, withSpring, withRepeat } from 'react-native-reanimated';


export default function App() {
  const rotate = useSharedValue('0deg');
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: rotate.value }],
    };
  });

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming("360deg", {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      false
    )

  }, [])

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Center flex={1}>
          <Animated.Image
            style={[{
              width: 200,
              height: 200,
              borderRadius: 100,
            }, animatedStyles]}
            source={require("./assets/splash.png")}
          />
        </Center>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
