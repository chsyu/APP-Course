import React, { useCallback } from 'react';
import { Center, Pressable } from 'native-base';
import Animated, {
   useSharedValue,
   withTiming,
   useAnimatedProps,
   useDerivedValue
} from 'react-native-reanimated';
import { ReText } from 'react-native-redash';

import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function CircleCounter({ R, count, stroke_color }) {
   const CIRCLE_LENGTH = Math.ceil(R * 2 * Math.PI);
   const width = 2.5 * R;
   const height = 2.5 * R;
   const fontSize = R * 0.7;
   const BACKGROUND_STROKE_COLOR = 'lightgray';
   // const stroke_color = '#444B6F';
   const strokeWidth = 20;

   const progress = useSharedValue(0);

   const animatedProps = useAnimatedProps(() => ({
      strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
   }));

   const progressText = useDerivedValue(() => {
      return `${Math.floor(progress.value * count)}`;
   });

   const onPress = useCallback(() => {
      progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 1000 });
   }, []);

   return (
      <Pressable w={width} h={height} onPress={onPress}>
         <Center flex={1}>
            <ReText
               style={{
                  fontSize: fontSize,
                  color: stroke_color,
                  textAlign: 'center',
                  position: 'absolute',
               }}
               text={progressText}
            />
            <Svg style={{ position: 'absolute' }}>
               <Circle
                  cx='50%'
                  cy='50%'
                  r={R}
                  stroke={BACKGROUND_STROKE_COLOR}
                  strokeWidth={strokeWidth}
               />
               <AnimatedCircle
                  cx='50%'
                  cy='50%'
                  r={R}
                  stroke={stroke_color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={CIRCLE_LENGTH}
                  animatedProps={animatedProps}
                  strokeLinecap={'round'}
               />
            </Svg>
         </Center>
      </Pressable>

   );
}
