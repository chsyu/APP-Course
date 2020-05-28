import React from "react";
import { View } from "react-native";
import Ball from "./components/Ball";

const App = () => {
  return (
    <View>
      <Ball positionXY={{ x: 20, y: 20 }} />
      <Ball positionXY={{ x: 100, y: 100 }} />
      <Ball positionXY={{ x: 200, y: 200 }} />
    </View>
  );
};

export default App;
