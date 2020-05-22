import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";

export default function App() {
  const [msg, setMsg] = useState("Waiting..");
  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setMsg("Permission to access location was denied");
    } else {
      let location = await Location.getCurrentPositionAsync({});
      setMsg(JSON.stringify(location));
    }
  };

  useEffect(() => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      setMsg(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
      return;
    }
    getLocation();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{msg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center",
  },
});
