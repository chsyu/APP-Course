import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <Image style={styles.image} source={require("./imgs/beach.jpg")} />
          <Text style={styles.title}>beach</Text>
        </View>
        <View>
          <Image style={styles.image} source={require("./imgs/forest.jpg")} />
          <Text style={styles.title}>forest</Text>
        </View>
      </View>

      <View style={styles.hr} />
      <View style={styles.row}>
        <View>
          <Image
            source={{
              uri: "https://dtd.ntue.edu.tw/wp-content/uploads/2015/09/1-7.png",
            }}
            style={styles.image}
          />
          <Text style={styles.title}>chsyu</Text>
        </View>
        <View>
          <Image
            source={{
              uri: "https://dtd.ntue.edu.tw/wp-content/uploads/2015/09/1-1.png",
            }}
            style={styles.image}
          />
          <Text style={styles.title}>plFan</Text>
        </View>
      </View>
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
  row: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 32,
    fontWeight: "500",
    alignSelf: "center",
    marginVertical: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150,
    alignSelf: "center",
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
