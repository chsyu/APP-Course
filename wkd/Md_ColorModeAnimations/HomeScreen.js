import { Appearance, Dimensions, useColorScheme } from "react-native";
import {
  Center,
  Box,
  Text,
  Pressable,
  useColorMode,
} from "@gluestack-ui/themed";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import Ionicon from "react-native-vector-icons/Ionicons";

const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedCenter = Animated.createAnimatedComponent(Center);
const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedIonicon = Animated.createAnimatedComponent(Ionicon);

const WIDTH = Dimensions.get("window").width * 0.7;

const Colors = {
  dark: {
    background: "#1E1E1E",
    circle: "#252525",
    icon: "#000",
    text: "#F8F8F8",
  },
  light: {
    background: "#F8F8F8",
    circle: "#FFF",
    icon: "#F4F4F5",
    text: "#1E1E1E",
  },
};

export default function App() {
  const colorScheme = useColorScheme();

  const toggleColorMode = () => {
    const nextColorScheme = colorScheme === "light" ? "dark" : "light";
    Appearance.setColorScheme(nextColorScheme);
  };

  const progress = useDerivedValue(() => {
    return withTiming(colorScheme === "dark" ? 1 : 0, { duration: 2000 });
  });

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    );

    return {
      backgroundColor,
    };
  });

  const animatedCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle]
    );

    return {
      backgroundColor,
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.icon, Colors.dark.icon]
    );

    return {
      backgroundColor,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text]
    );

    return {
      color,
    };
  });

  return (
    <AnimatedCenter flex={1} style={animatedStyle}>
      <AnimatedText
        fontSize={70}
        fontWeight={"700"}
        letterSpacing={14}
        marginBottom={35}
        style={animatedTextStyle}
      >
        THEME
      </AnimatedText>
      <AnimatedCenter
        w={WIDTH}
        h={WIDTH}
        borderRadius={WIDTH / 2}
        shadow="4"
        style={animatedCircleStyle}
      >
        <Pressable onPress={toggleColorMode}>
          <AnimatedBox borderRadius={40} style={animatedIconStyle}>
            <AnimatedIonicon
              name={colorScheme == "dark" ? "moon-outline" : "sunny-outline"}
              size={40}
              style={animatedTextStyle}
            />
          </AnimatedBox>
        </Pressable>
      </AnimatedCenter>
    </AnimatedCenter>
  );
}
