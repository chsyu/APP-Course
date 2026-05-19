import "../global.css";

import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CircleCounter from "../components/CircleCounter";

const COUNTERS = [
  [
    { size: 50, count: 100, stroke_color: "#444B6F" },
    { size: 50, count: 255, stroke_color: "darkorange" },
  ],
  [
    { size: 50, count: 200, stroke_color: "darkblue" },
    { size: 50, count: 511, stroke_color: "darkred" },
  ],
];

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">
        <View className="m-2.5 mt-[60px]">
          {COUNTERS.map((row, rowIndex) => (
            <View
              key={rowIndex}
              className="mt-8 flex-row justify-around"
            >
              {row.map((props) => (
                <CircleCounter key={`${props.count}-${props.stroke_color}`} {...props} />
              ))}
            </View>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

