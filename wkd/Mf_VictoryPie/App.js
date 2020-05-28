import React from "react";
import { View } from "react-native";
import { VictoryPie } from "victory-native";

const sampleData = [
  { x: "Cats", y: 35 },
  { x: "Dogs", y: 40 },
  { x: "Birds", y: 55 },
];

export default () => {
  return (
    <View style={{ alignItems: "center" }}>
      <VictoryPie
        width={300}
        colorScale={["tomato", "orange", "gold"]}
        data={sampleData}
      />
    </View>
  );
};
