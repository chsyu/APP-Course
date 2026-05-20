import { Pressable, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedView = Animated.createAnimatedComponent(View);

export default function CircleCounter({ size, count, stroke_color }) {
  const circleLength = Math.ceil(size * 2 * Math.PI);
  const radius = size;
  const width = 2.5 * size;
  const height = 2.5 * size;
  const center = width / 2;
  const fontSize = size * 0.6;
  const strokeWidth = size * 0.4;

  const progress = useSharedValue(0);
  const barWidth = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circleLength * (1 - progress.value),
  }));

  const animatedBarStyle = useAnimatedStyle(() => ({
    width: `${barWidth.value}%`,
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * count)}`;
  });

  const onPress = () => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
    barWidth.value = withTiming(barWidth.value > 0 ? 0 : 30, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  };

  return (
    <Pressable
      onPress={onPress}
      style={{ width, height }}
      className="items-center justify-center active:opacity-80"
    >
      <View className="flex-1 items-center justify-center shadow-md">
        <ReText
          style={{
            position: "absolute",
            zIndex: 10,
            fontSize,
            fontWeight: "200",
            color: stroke_color,
            textAlign: "center",
          }}
          text={progressText}
        />

        <AnimatedView
          className="absolute bottom-[35px] z-10 h-1.5 w-[30%] rounded-full"
          style={[{ backgroundColor: stroke_color }, animatedBarStyle]}
        />

        <Svg
          width={width}
          height={height}
          style={{ position: "absolute" }}
        >
          <Circle
            cx={center}
            cy={center}
            r={radius}
            fill="white"
            stroke="#D3D3D3"
            strokeWidth={strokeWidth}
          />
          <AnimatedCircle
            cx={center}
            cy={center}
            r={radius}
            stroke={stroke_color}
            strokeWidth={strokeWidth}
            strokeDasharray={circleLength}
            animatedProps={animatedProps}
            strokeLinecap="round"
            fill="white"
          />
        </Svg>
      </View>
    </Pressable>
  );
}
