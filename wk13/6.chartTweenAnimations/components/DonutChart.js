import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Easing } from "react-native-reanimated";
import { Pie, PolarChart } from "victory-native";

const DEFAULT_DRAW_DURATION_MS = 2000;
const DEFAULT_INNER_RADIUS = "50%";
const DATA_TRANSITION_DELAY_MS = 100;

const DUMMY_SLICE = {
  label: "",
  value: 0,
  color: "#E8E8E8",
};

function toTargetChartData(data) {
  return [{ ...DUMMY_SLICE }, ...data];
}

function toInitialChartData(data) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 100;

  return [
    { ...DUMMY_SLICE, value: 1 },
    ...data.map((d) => ({
      ...d,
      value: Math.max(1, (d.value / total) * 10),
    })),
  ];
}

function ChartLegend({ data }) {
  return (
    <View className="mt-1.5 flex-row self-center">
      {data.map((d, index) => (
        <View key={index} className="mr-2 flex-row items-center">
          <View
            style={{
              width: 12,
              height: 12,
              marginRight: 4,
              backgroundColor: d.color,
            }}
          />
          <Text className="text-sm text-gray-800">{d.label}</Text>
        </View>
      ))}
    </View>
  );
}

export function DonutChart({
  data,
  duration = DEFAULT_DRAW_DURATION_MS,
  innerRadius = DEFAULT_INNER_RADIUS,
}) {
  const initialData = toInitialChartData(data);
  const [chartData, setChartData] = useState(initialData);

  const sliceAnimate = {
    type: "timing",
    duration,
    easing: Easing.out(Easing.exp),
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setChartData(toTargetChartData(data));
    }, DATA_TRANSITION_DELAY_MS);

    return () => clearTimeout(timer);
  }, [data]);

  return (
    <>
      <View style={styles.chartContainer}>
        <PolarChart
          data={chartData}
          labelKey="label"
          valueKey="value"
          colorKey="color"
        >
          <Pie.Chart innerRadius={innerRadius}>
            {() => <Pie.Slice animate={sliceAnimate} />}
          </Pie.Chart>
        </PolarChart>
      </View>
      <ChartLegend data={data} />
    </>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
  },
});
