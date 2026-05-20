import "../global.css";

import { Dimensions, Pressable, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";
import Svg, { Circle } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const CIRCLE_LENGTH = 800;
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function App() {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  });

  const onPress = () => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 2000 });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-app-bg">
        <View className="flex-1 items-center justify-center">
          <ReText
            style={{
              width: 200,
              fontSize: 80,
              color: "rgba(255, 255, 255, 0.7)",
              textAlign: "center",
            }}
            text={progressText}
          />

          <Svg style={{ position: "absolute" }}>
            <Circle
              cx={width / 2}
              cy={height / 2}
              r={R}
              stroke="#303858"
              strokeWidth={35}
            />
            <AnimatedCircle
              cx={width / 2}
              cy={height / 2}
              r={R}
              stroke="#A6E1FA"
              strokeWidth={40}
              strokeDasharray={CIRCLE_LENGTH}
              animatedProps={animatedProps}
              strokeLinecap="round"
            />
          </Svg>

          <Pressable
            onPress={onPress}
            className="absolute bottom-10 h-[60px] w-[70%] items-center justify-center rounded-xl bg-white/20 active:opacity-80"
          >
            <Text className="text-lg font-semibold text-white">Run</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
