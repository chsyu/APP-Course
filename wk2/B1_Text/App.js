import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

const App = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <StatusBar hidden={true} />
      <Text style={styles.header}>Title ONE</Text>
      <Text style={styles.content}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
        distinctio sunt ipsum aut fugit iusto porro sequi ex adipisci, similique
        nemo nam modi ducimus perferendis! Eveniet, modi. Itaque, ducimus
        officia.
      </Text>
      <View style={styles.hr} />
      <Text style={styles.header}>Title TWO</Text>
      <Text style={styles.content}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
        distinctio sunt ipsum aut fugit iusto porro sequi ex adipisci, similique
        nemo nam modi ducimus perferendis! Eveniet, modi. Itaque, ducimus
        officia.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 32,
    fontWeight: "500",
    alignSelf: "center",
    marginVertical: 10,
  },
  content: {
    fontSize: 16,
    fontWeight: "200",
  },
  hr: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginTop: 20,
    width: "100%",
    alignSelf: "center",
  },
});

export default App;
