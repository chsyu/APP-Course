import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Header from "./src/components/Header";

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar />
      <Header />
    </SafeAreaView>
  );
};

export default App;
