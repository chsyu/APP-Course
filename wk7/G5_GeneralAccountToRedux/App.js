import React from "react";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import Navigation from "./src/navigation";
import store from "./src/redux/store";

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <GluestackUIProvider config={config}>
          <Navigation />
        </GluestackUIProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
