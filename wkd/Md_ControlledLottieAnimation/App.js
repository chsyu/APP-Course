import React, { useRef } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import LottieView from "lottie-react-native";

const App = () => {
  const animation = useRef(null);

  const onPress = () => {
    animation.current.play();
  };

  return (
    <View style={styles.container}>
      <LottieView
        ref={animation}
        source={require("./json/download-icon.json")}
        loop={false}
      />
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.button}>{"PLAY"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },

  button: {
    alignSelf: "center",
    marginTop: "75%",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
  },
});

export default App;
