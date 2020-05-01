import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function App(props) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => { setCount(count+1)}, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50 }}>{count}</Text>
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
});
