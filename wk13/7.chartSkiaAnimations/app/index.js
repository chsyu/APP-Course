import "../global.css";
import React from "react";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { DonutChart } from "../components/DonutChart";

const chartData1 = [
  { label: "Cats", value: 35, color: "tomato" },
  { label: "Dogs", value: 40, color: "gold" },
  { label: "Birds", value: 25, color: "orange" },
];

const chartData2 = [{ label: "Cats", value: 35, color: "tomato" }];

const PieChart = () => {
  return (
    <View className="flex-1">
      <View className="mt-24 h-[200px]">
        <DonutChart data={chartData1} />
      </View>
      <View className="mt-24 h-[200px]">
        <DonutChart data={chartData2} backgroundColor="gold" />
      </View>
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">
        <PieChart />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
