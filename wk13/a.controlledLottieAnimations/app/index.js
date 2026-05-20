import "../global.css";

import React, { useRef } from "react";
import {
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

const App = () => {
  const { width } = useWindowDimensions();
  const animation = useRef(null);

  const onPress = () => {
    animation.current?.play();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center px-6">
          <LottieView
            ref={animation}
            source={require("../json/download-icon.json")}
            style={{ width, height: width }}
            loop={false}
          />
          <Pressable
            onPress={onPress}
            className="mt-8 w-1/2 items-center rounded-lg border-2 border-app-stroke bg-app-stroke-bg px-6 py-3 active:opacity-80"
          >
            <Text className="text-center text-base font-semibold uppercase tracking-wide text-app-stroke">
              PLAY
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
