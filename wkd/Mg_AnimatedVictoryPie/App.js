import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { VictoryPie } from "victory-native";

const defaultData = [
  { x: "Cats", y: 0 },
  { x: "Dogs", y: 0 },
  { x: "Birds", y: 100 },
];

const sampleData = [
  { x: "Cats", y: 35 },
  { x: "Dogs", y: 40 },
  { x: "Birds", y: 55 },
];
const dataColor = ["#388087", "#6fb3b8", "#badfe7"];

export default () => {
  const [graphicData, setGraphicData] = useState(defaultData);
  useEffect(() => {
    setGraphicData(sampleData);
  }, []);

  return (
    <View style={{ alignItems: "center" }}>
      <VictoryPie 
        width={300} 
        colorScale={dataColor} 
        data={sampleData} 
      />
      <VictoryPie
        animate={{ easing: "exp" }}
        data={graphicData}
        width={300}
        colorScale={dataColor}
        innerRadius={50}
        labelRadius={60}
      />
    </View>
  );
};
