import "../global.css";
import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";

const App = () => {
  const rotate = useSharedValue("0deg");
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: rotate.value }],
  }));

  useEffect(() => {
    rotate.value = withTiming("360deg", {
      duration: 2000,
      easing: Easing.out(Easing.exp),
    });
  }, []);

  const toggleRotation = () => {
    rotate.value = withSpring(rotate.value === "0deg" ? "360deg" : "0deg");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-slate-100">
        <View className="flex-1 items-center justify-center px-6">
          <Text className="mb-2 text-2xl font-bold tracking-tight text-zinc-900">
            Reanimated 4
          </Text>
          <Text className="mb-10 text-center text-sm text-zinc-500">
            點擊圖片切換旋轉
          </Text>

          <Pressable onPress={toggleRotation} className="active:opacity-80">
            <View className="items-center justify-center rounded-full p-1.5 shadow-l bg-white">
              <Animated.Image
                className="h-[200px] w-[200px] rounded-full"
                style={animatedStyles}
                source={require("../assets/splash.png")}
              />
            </View>
          </Pressable>

          <Text className="mt-8 text-xs uppercase tracking-widesttext-zinc-400">
            NativeWind
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
