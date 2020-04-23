import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonGroup from "./src/components/ButtonGroup";

const App = () => {
  let [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <ButtonGroup
        increaseBtn={() => setCount((count += 1))}
        decreaseBtn={() => setCount((count -= 1))}
      />
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
  count: {
    marginTop: 60,
    textAlign: "center",
    fontSize: 60,
    fontWeight: "bold",
  },
});

export default App;
