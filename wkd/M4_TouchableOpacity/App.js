import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const { width, height } = Dimensions.get("window");
const BALLWIDTH = 60;

const App = () => {
  const position = useRef(new Animated.ValueXY(0, 0)).current;
  const [hasMoved, setHasMoved] = useState(false);
  const AnimatedBall = Animated.createAnimatedComponent(TouchableOpacity);

  const startAnimation = () => {
    Animated.spring(position, {
      toValue: hasMoved
        ? { x: 0, y: 0 }
        : { x: width - BALLWIDTH, y: height - BALLWIDTH },
    }).start();
    setHasMoved(!hasMoved);
  };

  return (
    <AnimatedBall
      style={[position.getLayout(), styles.ball]}
      onPress={() => startAnimation()}
    />
  );
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
