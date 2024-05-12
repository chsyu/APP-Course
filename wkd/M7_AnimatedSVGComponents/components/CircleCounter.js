import { Center, Pressable, Box } from '@gluestack-ui/themed';
import Animated, {
   useSharedValue,
   withTiming,
   useAnimatedProps,
   useAnimatedStyle,
   useDerivedValue,
   Easing,
} from 'react-native-reanimated';
import { ReText } from 'react-native-redash';

import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function CircleCounter({ size, count, stroke_color }) {
   const CIRCLE_LENGTH = Math.ceil(size * 2 * Math.PI);
   const R = size;
   const width = 2.5 * size;
   const height = 2.5 * size;
   const fontSize = size * 0.6;
   const BACKGROUND_STROKE_COLOR = 'lightgray';
   const strokeWidth = size * 0.4;

   const progress = useSharedValue(0);
   const _width = useSharedValue(0);

   const animatedProps = useAnimatedProps(() => ({
      strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
   }));

   const animatedWidth = useAnimatedStyle(() =>( {
      width: `${_width.value}%`
   }))

   const progressText = useDerivedValue(() => {
      return `${Math.floor(progress.value * count)}`;
   });

   const onPress = () => {
      progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 1000, easing: Easing.out(Easing.exp), });
      _width.value = withTiming(_width.value > 0 ? 0 : 30, {duration: 1000, easing: Easing.out(Easing.exp),});
   };

   return (
      <Pressable w={width} h={height} onPress={onPress}>
         <Center flex={1} shadow="2">
            <ReText
               style={{
                  zIndex: 1,
                  fontSize: fontSize,
                  fontWeight: '200',
                  color: stroke_color,
                  textAlign: 'center',
                  position: 'absolute',
               }}
               text={progressText}
            />
            <AnimatedBox 
               bg={stroke_color} h={6} width={"30%"} 
               position="absolute" bottom={35}
               zIndex={1}
               style={animatedWidth}
            />
            <Svg style={{ position: 'absolute' }}>
               <Circle
                  cx='50%'
                  cy='50%'
                  r={R}
                  fill={"blue"}
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
                  fill={"white"}
               />
            </Svg>
         </Center>
      </Pressable>

   );
}
