import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const App = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://dtd.ntue.edu.tw/wp-content/uploads/2015/09/1-7.png"
        }}
        style={{ width: 300, height: 300 }}
      />
      <Text>chsyu</Text>
      <Image
        source={{
          uri: "https://dtd.ntue.edu.tw/wp-content/uploads/2015/09/1-1.png"
        }}
        style={{ width: 300, height: 300 }}
      />
      <Text>plFan</Text>
      <Image
        source={{
          uri: "https://dtd.ntue.edu.tw/wp-content/uploads/2015/09/1-10.jpg"
        }}
        style={{ width: 300, height: 300 }}
      />
      <Text>albertWang</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
