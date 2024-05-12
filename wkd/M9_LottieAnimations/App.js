import React, { useEffect } from "react";
import { useColorScheme, Dimensions } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GluestackUIProvider, Box, Center } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import LottieView from "lottie-react-native";

const App = () => {
  const colorScheme = useColorScheme();
  const WIDTH = Dimensions.get("window").width;

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config} colorMode={colorScheme}>
        <Center flex={1}>
          <LottieView
            source={require("./json/download-icon.json")}
            style={{ width: WIDTH, height: WIDTH }}
            loop
            autoPlay
          />
        </Center>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
};

export default App;
