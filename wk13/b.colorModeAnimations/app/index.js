import { useEffect } from "react";
import { Dimensions, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { themeColorPair, themeColors } from "../theme/colors";

const WIDTH = Dimensions.get("window").width * 0.7;

// Must be module-level constants — do not call functions inside Reanimated worklets.
const BACKGROUND_COLORS = themeColorPair("background");
const CIRCLE_COLORS = themeColorPair("circle");
const ICON_COLORS = themeColorPair("icon");
const TEXT_COLORS = themeColorPair("text");

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const scheme = isDark ? "dark" : "light";

  const progress = useSharedValue(isDark ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isDark ? 1 : 0, { duration: 2000 });
  }, [isDark, progress]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], BACKGROUND_COLORS),
  }));

  const animatedCircleStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], CIRCLE_COLORS),
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], ICON_COLORS),
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], TEXT_COLORS),
  }));

  return (
    <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
      <Animated.View
        className="flex-1 items-center justify-center bg-theme-background"
        style={animatedContainerStyle}
      >
        <Animated.Text
          className="mb-9 text-[70px] font-bold tracking-[14px] text-theme-text"
          style={animatedTextStyle}
        >
          THEME
        </Animated.Text>
        <Animated.View
          className="items-center justify-center bg-theme-circle shadow-lg"
          style={[
            animatedCircleStyle,
            { width: WIDTH, height: WIDTH, borderRadius: WIDTH / 2 },
          ]}
        >
          <Pressable onPress={toggleColorScheme} accessibilityRole="button">
            <Animated.View
              className="rounded-[40px] bg-theme-icon p-2"
              style={animatedIconStyle}
            >
              <Ionicons
                name={isDark ? "moon-outline" : "sunny-outline"}
                size={40}
                color={themeColors[scheme].text}
              />
            </Animated.View>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}
