import React from "react";
import { useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@gluestack-ui/config";
import Navigation from "./src/navigation";
import { store } from "./src/redux/store";

const queryClient = new QueryClient();

const App = () => {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <GluestackUIProvider config={config} colorMode={colorScheme}>
            <Navigation />
          </GluestackUIProvider>
        </Provider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
