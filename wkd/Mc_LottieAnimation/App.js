import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import LottieView from "lottie-react-native";

const App = () => {
  return (
    <View style={styles.container}>
      <LottieView
        ref={animation}
        source={require("./json/download-icon.json")}
        loop
        autoPlay
      />
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
