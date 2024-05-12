import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GluestackUIProvider, Center, Pressable } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";

const App = () => {
  const colorScheme = useColorScheme();
  const rotate = useSharedValue("0deg");
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: rotate.value }],
  }));

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
      <GluestackUIProvider config={config} colorMode={colorScheme}>
        <Center flex={1}>
          <Pressable
            onPress={() => {
              rotate.value = withSpring(
                rotate.value == "0deg" ? "360deg" : "0deg"
              );
            }}
          >
            <Animated.Image
              style={[
                {
                  width: 200,
                  height: 200,
                  borderRadius: 100,
                },
                animatedStyles,
              ]}
              source={require("./assets/splash.png")}
            />
          </Pressable>
        </Center>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
};

export default App;
