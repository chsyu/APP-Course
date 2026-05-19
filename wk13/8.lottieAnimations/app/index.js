import "../global.css";

import React from "react";
import { useWindowDimensions, View } from "react-native";
import LottieView from "lottie-react-native";

export default function App() {
  const { width } = useWindowDimensions();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <LottieView
        source={require("../json/download-icon.json")}
        style={{ width, height: width }}
        loop
        autoPlay
      />
    </View>
  );
}