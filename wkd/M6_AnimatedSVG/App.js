import React, { useCallback } from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider, Button, Center } from 'native-base';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  useDerivedValue
} from 'react-native-reanimated';
import { ReText } from 'react-native-redash';

import Svg, { Circle } from 'react-native-svg';

const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1FA';

const { width, height } = Dimensions.get('window');

const CIRCLE_LENGTH = 800; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function App() {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  });

  const onPress = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 2000 });
  }, []);

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Center flex={1} bg={BACKGROUND_COLOR}>
          <ReText
            style={{
              fontSize: 80,
              color: 'rgba(256,256,256,0.7)',
              width: 200,
              textAlign: 'center',
            }}
            text={progressText}
          />
          <Svg style={{ position: 'absolute' }}>
            <Circle
              cx={width / 2}
              cy={height / 2}
              r={R}
              stroke={BACKGROUND_STROKE_COLOR}
              strokeWidth={35}
            />
            <AnimatedCircle
              cx={width / 2}
              cy={height / 2}
              r={R}
              stroke={STROKE_COLOR}
              strokeWidth={40}
              strokeDasharray={CIRCLE_LENGTH}
              animatedProps={animatedProps}
              strokeLinecap={'round'}
            />
          </Svg>
          <Button onPress={onPress}
            position={'absolute'}
            bottom={40}
            width={width * 0.7}
            height={60}
            _text={{
              fontSize: 26
            }}
          >
            Run
          </Button>
        </Center>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
