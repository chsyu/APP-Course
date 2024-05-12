import React, { useEffect } from "react";
import { useColorScheme, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GluestackUIProvider, Center, Pressable } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
} from "react-native-reanimated";

const App = () => {
  const colorScheme = useColorScheme();
  const rotation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  }, [rotation.value]);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      200
    );
  }, []);

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config} colorMode={colorScheme}>
        <Center flex={1}>
          <Animated.View style={[styles.spinner, animatedStyles]} />
        </Center>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  spinner: {
    height: 60,
    width: 60,
    borderRadius: 60,
    borderWidth: 7,
    borderTopColor: "#f5f5f5",
    borderRightColor: "#f5f5f5",
    borderBottomColor: "green",
    borderLeftColor: "green",
  },
});

export default App;
