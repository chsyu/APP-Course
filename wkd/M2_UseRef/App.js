import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";

const App = () => {
  const position = useRef(new Animated.ValueXY(0, 0)).current;
  useEffect(() => {
    Animated.spring(position, {
      toValue: { x: 350, y: 500 },
    }).start();
  }, []);

  return  <Animated.View 
           style={[position.getLayout(), styles.ball]} 
          />;
};

const styles = StyleSheet.create({
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "red",
  },
});

export default App;
