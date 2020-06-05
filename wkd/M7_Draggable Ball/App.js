import React, { useRef } from "react";
import { Animated, StyleSheet, PanResponder } from "react-native";
const BALLWIDTH = 60;

const App = () => {
  const position = useRef(new Animated.ValueXY({ x: 30, y: 30 })).current;
  const panResponder = useRef(
    PanResponder.create({
      // onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        let { moveX, moveY } = gesture;
        position.setValue({
          x: moveX - BALLWIDTH / 2,
          y: moveY - BALLWIDTH / 2,
        });
      },      
      // onPanResponderRelease: (event, gesture) => {},
    })
  ).current;

  return (
    <Animated.View
      style={[position.getLayout(), styles.ball]}
      {...panResponder.panHandlers}
    />
  );
};

const styles = StyleSheet.create({
  ball: {
    height: BALLWIDTH,
    width: BALLWIDTH,
    borderRadius: BALLWIDTH,
    backgroundColor: "red",
    position: 'absolute',
  },
});

export default App;
