import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { Canvas, FillType, Path, Rect, Skia } from "@shopify/react-native-skia";
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

const AnimatedPieSlice = ({ slice, progress }) => {
  const path = useDerivedValue(() => buildSlicePath(slice, progress.value));

  return <Path path={path} style="fill" color={slice.color} />;
};

const DonutBackground = ({ slice, color }) => {
  const path = useDerivedValue(() =>
    buildSlicePath(
      { ...slice, sweepAngle: 360, sliceIsEntireCircle: true },
      1,
    ),
  );

  return <Path path={path} style="fill" color={color} />;
};

export function DonutChart({
  data,
  backgroundColor,
  duration = DEFAULT_DRAW_DURATION_MS,
  segmentTotal = DEFAULT_SEGMENT_TOTAL,
  innerRadius = DEFAULT_INNER_RADIUS,
}) {
  const drawProgress = useSharedValue(0);
  const segment = data[0];

  useEffect(() => {
    drawProgress.value = withTiming(1, {
      duration,
      easing: Easing.inOut(Easing.cubic),
    });
  }, [drawProgress, duration]);

  return (
    <>
      <PolarChart
        data={data}
        labelKey="label"
        valueKey="value"
        colorKey="color"
      >
        <Pie.Chart innerRadius={innerRadius}>
          {({ slice }) =>
            backgroundColor ? (
              <>
                <DonutBackground slice={slice} color={backgroundColor} />
                <AnimatedPieSlice
                  slice={{
                    ...slice,
                    color: segment.color,
                    sweepAngle: (segment.value / segmentTotal) * 360,
                    sliceIsEntireCircle: false,
                  }}
                  progress={drawProgress}
                />
              </>
            ) : (
              <AnimatedPieSlice slice={slice} progress={drawProgress} />
            )
          }
        </Pie.Chart>
      </PolarChart>
      <View className="mt-1.5 flex-row self-center">
        {data.map((d, index) => (
          <View key={index} className="mr-2 flex-row items-center">
            <Canvas style={{ height: 12, width: 12, marginRight: 4 }}>
              <Rect
                rect={{ x: 0, y: 0, width: 12, height: 12 }}
                color={d.color}
              />
            </Canvas>
            <Text className="text-sm text-gray-800">{d.label}</Text>
          </View>
        ))}
      </View>
    </>
  );
}
