import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Header = (props) => {
  return (
      <View style={styles.headerStyle}>
        <Text style={styles.textStyle}>{props.title}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    height: 90,
    paddingTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    // Android Only
    elevation: 2
  },
  textStyle: {
    fontSize: 20
  },
});

export default Header;
