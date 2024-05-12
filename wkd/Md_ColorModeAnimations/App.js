import React from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  GluestackUIProvider,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import HomeScreen from "./HomeScreen";

const App = () => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config} colorMode={colorScheme}>
        <HomeScreen />
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
};

export default App;
