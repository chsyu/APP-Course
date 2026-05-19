import "../global.css";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export default function App() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX + savedTranslateX.value;
      translateY.value = event.translationY + savedTranslateY.value;
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-1 items-center justify-center">
            <GestureDetector gesture={pan}>
              <Animated.Image
                className="h-[150px] w-[150px] rounded-full"
                style={animatedStyles}
                source={require("../assets/splash.png")}
              />
            </GestureDetector>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
