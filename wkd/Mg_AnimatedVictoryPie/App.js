import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { VictoryPie } from "victory-native";

const sampleData = [
  { x: "Cats", y: 35 },
  { x: "Dogs", y: 40 },
  { x: "Birds", y: 55 },
];
const graphicColor = ["#388087", "#6fb3b8", "#badfe7"]; // Colors
const wantedGraphicData = [{ y: 10 }, { y: 50 }, { y: 40 }]; // Data that we want to display
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }]; // Data used to make the animate prop work

export default () => {
  const [graphicData, setGraphicData] = useState(defaultGraphicData);
  useEffect(() => {
    setGraphicData(wantedGraphicData); // Setting the data that we want to display
  }, []);

  return (
    <View style={{ alignItems: "center" }}>
      <VictoryPie
        width={300}
        colorScale={["tomato", "orange", "gold"]}
        data={sampleData}
      />
      <VictoryPie
        animate={{ easing: "exp" }}
        data={graphicData}
        width={250}
        height={250}
        colorScale={graphicColor}
        innerRadius={50}
      />
    </View>
  );
};
