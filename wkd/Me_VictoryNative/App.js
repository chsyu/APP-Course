import React from "react";
import { View } from "react-native";
import { VictoryPie, VictoryBar } from "victory-native";

export default () => {
  return (
    <View style={{ alignItems: "center" }}>
      <VictoryPie width={300} />
      <VictoryBar width={300} />
    </View>
  );
};
