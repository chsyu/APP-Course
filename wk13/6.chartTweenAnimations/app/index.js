import "../global.css";
import React from "react";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { DonutChart } from "../components/DonutChart";

const chartData = [
  { label: "Cats", value: 35, color: "tomato" },
  { label: "Dogs", value: 40, color: "gold" },
  { label: "Birds", value: 25, color: "orange" },
];

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">
        <View className="mt-24 h-[200px]">
          <DonutChart data={chartData} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
