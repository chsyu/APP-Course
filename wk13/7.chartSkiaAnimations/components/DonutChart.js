import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FillType, Path, Skia } from "@shopify/react-native-skia";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Pie, PolarChart } from "victory-native";

const DEFAULT_DRAW_DURATION_MS = 1000;
const DEFAULT_SEGMENT_TOTAL = 100;
const DEFAULT_INNER_RADIUS = "50%";

/** Sweep-in animation: arc length scales with progress (0 → 1). */
const buildSlicePath = (slice, progress) => {
  "worklet";
  const { radius, center, startAngle, sweepAngle, innerRadius } = slice;
  const path = Skia.Path.Make();

  if (progress <= 0) {
    return path;
  }

  const animatedSweep = sweepAngle * progress;
  const endAngle = startAngle + animatedSweep;
  const isFullCircle = slice.sliceIsEntireCircle && progress >= 1;

  if (isFullCircle) {
    path.addOval(
      Skia.XYWHRect(
        center.x - radius,
        center.y - radius,
        radius * 2,
        radius * 2,
      ),
    );
  } else {
    path.arcToOval(
      Skia.XYWHRect(
        center.x - radius,
        center.y - radius,
        radius * 2,
        radius * 2,
      ),
      startAngle,
      animatedSweep,
      false,
    );
  }

  if (innerRadius > 0) {
    if (isFullCircle) {
      path.addOval(
        Skia.XYWHRect(
          center.x - innerRadius,
          center.y - innerRadius,
          innerRadius * 2,
          innerRadius * 2,
        ),
      );
      path.setFillType(FillType.EvenOdd);
    } else {
      path.arcToOval(
        Skia.XYWHRect(
          center.x - innerRadius,
          center.y - innerRadius,
          innerRadius * 2,
          innerRadius * 2,
        ),
        endAngle,
        startAngle - endAngle,
        false,
      );
    }
  } else {
    path.lineTo(center.x, center.y);
  }

  path.close();
  return path;
};

function AnimatedDonutSlice({ slice, duration }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration,
      easing: Easing.inOut(Easing.cubic),
    });
  }, [duration, progress]);

  const path = useDerivedValue(() => buildSlicePath(slice, progress.value));

  return <Path path={path} style="fill" color={slice.color} />;
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

function DonutPieChart({
  data,
  innerRadius,
  circleSweepDegrees = 360,
  duration,
  animated = true,
  forcePartialSlice = false,
}) {
  return (
    <PolarChart
      data={data}
      labelKey="label"
      valueKey="value"
      colorKey="color"
    >
      <Pie.Chart 
        innerRadius={innerRadius} 
        circleSweepDegrees={circleSweepDegrees}>
        {({ slice }) => {
          const drawSlice = forcePartialSlice
            ? { ...slice, sliceIsEntireCircle: false }
            : slice;

          return animated ? (
            <AnimatedDonutSlice 
              slice={drawSlice} duration={duration} />
          ) : (
            <Pie.Slice />
          );
        }}
      </Pie.Chart>
    </PolarChart>
  );
}

export function DonutChart({
  data,
  backgroundColor,
  duration = DEFAULT_DRAW_DURATION_MS,
  segmentTotal = DEFAULT_SEGMENT_TOTAL,
  innerRadius = DEFAULT_INNER_RADIUS,
}) {
  const segment = data[0];
  const circleSweepDegrees = backgroundColor
    ? (segment.value / segmentTotal) * 360
    : 360;

  return (
    <>
      <View style={styles.chartContainer}>
        {backgroundColor ? (
          <View style={styles.chartLayer}>
            <DonutPieChart
              data={[{ label: "", value: 1, color: backgroundColor }]}
              innerRadius={innerRadius}
              animated={false}
            />
          </View>
        ) : null}
        <View style={styles.chartLayer}>
          <DonutPieChart
            data={data}
            innerRadius={innerRadius}
            circleSweepDegrees={circleSweepDegrees}
            duration={duration}
            forcePartialSlice={Boolean(backgroundColor)}
          />
        </View>
      </View>
      <ChartLegend data={data} />
    </>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    position: "relative",
  },
  chartLayer: {
    ...StyleSheet.absoluteFillObject,
  },
});
