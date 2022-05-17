import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider, Center } from 'native-base';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';

const App = () => {
  const rotation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  }, [rotation.value]);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      200
    );
  }, []);

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Center flex={1}>
          <Animated.View style={[styles.spinner, animatedStyles]} />
        </Center>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  spinner: {
    height: 60,
    width: 60,
    borderRadius: 60,
    borderWidth: 7,
    borderTopColor: '#f5f5f5',
    borderRightColor: '#f5f5f5',
    borderBottomColor: 'green',
    borderLeftColor: 'green',
  },
});
export default App;