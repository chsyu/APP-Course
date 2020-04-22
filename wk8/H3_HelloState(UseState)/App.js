import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

const App = () => {
  let [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.btnArea}>
        <Button
          title="+"
          titleStyle={{ fontSize: 60 }}
          buttonStyle={styles.btnStyle}
          onPress={() => setCount((count += 1))}
        />
        <Button
          title="-"
          titleStyle={{ fontSize: 60 }}
          buttonStyle={styles.btnStyle}
          onPress={() => setCount((count -= 1))}
        />
      </View>
      <Text style={styles.count}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  btnArea: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
  },
  btnStyle: {
    backgroundColor: "rgba(92, 99,216, 1)",
    padding: 40,
  },
  count: {
    marginTop: 60,
    textAlign: "center",
    fontSize: 60,
    fontWeight: "bold",
  },
});

export default App;
