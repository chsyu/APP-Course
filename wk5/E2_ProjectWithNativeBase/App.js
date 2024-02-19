import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Navigation from "./src/navigation";
import { PaperProvider } from "react-native-paper";

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <PaperProvider>
          <Navigation />
        </PaperProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
