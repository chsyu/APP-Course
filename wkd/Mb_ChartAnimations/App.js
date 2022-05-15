import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { VictoryPie } from "victory-native";

const sampleData = [
  { x: "Cats", y: 35 },
  { x: "Dogs", y: 40 },
  { x: "Birds", y: 55 },
];
const dataColor = ["tomato", "gold", "orange"];

export default () => {
  const [graphicData, setGraphicData] = useState(defaultData);

  useEffect(() => {
    setGraphicData(sampleData);
  }, []);

  return (
    <View style={{ alignItems: "center" }}>
      <VictoryPie
        animate={{ easing: "exp" }}
        data={graphicData}
        width={300}
        colorScale={dataColor}
        style={{
          data: {
            fillOpacity: 0.9, stroke: "#c43a31", strokeWidth: 3
          },
          labels: {
            fontSize: 14, fill: "#c43a31",
            padding: 10,

          }
        }}
      />
      <VictoryPie
        animate={{ easing: "exp" }}
        data={graphicData}
        width={300}
        colorScale={dataColor}
        style={{
          data: {
            fillOpacity: 0.9, stroke: "#c43a31", strokeWidth: 3
          },
          labels: {
            fontSize: 14, fill: "#c43a31",
            padding: 10,

          }
        }}
        innerRadius={50}
        // labelRadius={60}
      />
    </View>
  );
};
