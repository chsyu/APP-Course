import { useEffect } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider, Center, Pressable } from 'native-base';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';


export default function App() {
  const rotate = useSharedValue('0deg');
  const animatedStyles = useAnimatedStyle(() => ({
      transform: { rotate: rotate.value },
    }));

  useEffect(() => {
    rotate.value = withTiming("360deg", {
      duration: 5000,
      easing: Easing.out(Easing.exp),
    });
  }, [])

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Center flex={1}>
          <Pressable
            onPress={() => {
              rotate.value = 
                withSpring(rotate.value == "0deg" ? "360deg" : "0deg")
            }}
          >
            <Animated.Image
              style={[{
                width: 200,
                height: 200,
                borderRadius: 100,
              }, animatedStyles]}
              source={require("./assets/splash.png")}
            />
          </Pressable>
        </Center>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
