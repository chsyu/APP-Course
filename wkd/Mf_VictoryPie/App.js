import React, { Component } from "react";
import { StyleSheet, View, Dimensions, Text, ScrollView } from "react-native";
import { VictoryPie } from "victory-native";

export default () => {
  const sampleData = [
    { x: "Cats", y: 35 },
    { x: "Dogs", y: 40 },
    { x: "Birds", y: 55 },
  ];

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

const viewStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  monospace: {
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  contentContainer: {
    alignItems: "center",
  },
  header: {
    fontWeight: "600",
    padding: 15,
    fontSize: 18,
  },
});
