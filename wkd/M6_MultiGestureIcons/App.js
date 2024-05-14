import React from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeScreen from "./HomeScreen";

const App = () => {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <GluestackUIProvider config={config} colorMode={colorScheme}>
          <HomeScreen />
        </GluestackUIProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
