import * as React from "react";
import { StyleSheet, View, Text, Button, AsyncStorage } from "react-native";
const COUNTER_KEY = "COUNTER_KEY";

export default function App(props) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(COUNTER_KEY);
        const state = JSON.parse(savedStateString);
        setCount(state);
      } catch (e) {}
    };
    restoreState();
  }, []);

  const plusOneFn = () => {
    setCount(count + 1);
    try {
      AsyncStorage.setItem(COUNTER_KEY, JSON.stringify(count));
    } catch (error) {
      // Error saving data
    }
  };

  const resetFn = () => {
    setCount(0);
    try {
      AsyncStorage.setItem(COUNTER_KEY, JSON.stringify(count));
    } catch (error) {
      // Error saving data
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50 }}>{count}</Text>
      <View style={styles.buttonGroup}>
        <Button onPress={plusOneFn} title="PLUS ONE" color="#841584" />
        <Button onPress={resetFn} title="RESET" color="blue" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonGroup: {
    flexDirection: "row",
  },
});
