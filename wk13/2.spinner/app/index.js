import "../global.css";
import React, { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

const Spinner = () => {
  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      200
    );
  }, [rotation]);

  return (
    <Animated.View
      className="h-[60px] w-[60px] rounded-full border-[7px] border-t-neutral-100 border-r-neutral-100 border-b-green-500 border-l-green-500"
      style={animatedStyles}
    />
  );
};

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Spinner />
      </View>
    </SafeAreaView>
  </SafeAreaProvider>
);

export default App;
