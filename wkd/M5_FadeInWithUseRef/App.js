import React, { useRef, useEffect } from "react";
import { Animated, Text, View } from "react-native";

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
};

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FadeInView
        style={{ width: 250, height: 50, backgroundColor: "powderblue" }}
      >
        <Text style={{ fontSize: 28, textAlign: "center", margin: 10 }}>
          Fading in
        </Text>
      </FadeInView>
    </View>
  );
};
