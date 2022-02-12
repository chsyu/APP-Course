import React from "react";
import { StyleSheet, StatusBar, SafeAreaView, Text } from "react-native";
import albumData from "./src/json/albums.json";

const App = () => {
  return (
    <SafeAreaView style={styles.containerStyle}>
      <StatusBar />
      <Text>{albumData[0].title}</Text>
      <Text>{albumData[0].artist}</Text>
      <Text>{albumData[1].title}</Text>
      <Text>{albumData[1].artist}</Text>
      <Text>{albumData[2].title}</Text>
      <Text>{albumData[2].artist}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default App;
