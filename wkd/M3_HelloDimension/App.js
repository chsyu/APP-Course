import React, { useRef, useEffect } from "react";
import { 
   Animated, 
   Dimensions, 
   StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");
const BALLWIDTH = 60;

const App = () => {
  const position = useRef(new Animated.ValueXY(0, 0)).current;
  useEffect(() => {
    Animated.spring(position, {
      toValue: { x: width - BALLWIDTH, y: height - BALLWIDTH },
    }).start();
  }, []);

  return <Animated.View style={[position.getLayout(), styles.ball]} />;
};

const styles = StyleSheet.create({
  ball: {
    height: BALLWIDTH,
    width: BALLWIDTH,
    borderRadius: BALLWIDTH,
    backgroundColor: "red",
  },
});

export default App;
