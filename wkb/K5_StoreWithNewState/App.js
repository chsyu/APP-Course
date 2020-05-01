import * as React from "react";
import { StyleSheet, View, Text, Button, AsyncStorage } from "react-native";
const COUNTER_KEY = "COUNTER_KEY";

export default function App(props) {
  const [count, setCount] = React.useState(0);
  const saveToAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem(COUNTER_KEY, JSON.stringify(count));
    } catch (error) {
      // Error saving data
    }
  };
  const restoreState = async () => {
    try {
      const savedStateString = await AsyncStorage.getItem(COUNTER_KEY);
      const state = JSON.parse(savedStateString);
      setCount(state);
    } catch (e) {}
  };

  React.useEffect(() => {
    restoreState();
  }, []);

  React.useEffect(() => {
    saveToAsyncStorage();
  }, [count]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50 }}>{count}</Text>
      <View style={styles.buttonGroup}>
        <Button
          onPress={() => {
            setCount(count + 1);
          }}
          title="PLUS ONE"
          color="#841584"
        />
        <Button
          onPress={() => {
              setCount(0);
          }}
          title="RESET"
          color="blue"
        />
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
