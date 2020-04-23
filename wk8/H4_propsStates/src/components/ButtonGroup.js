import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

const ButtonGroup = (props) => {
  return (
    <View style={styles.btnArea}>
      <Button
        title="+"
        titleStyle={styles.titleStyle}
        buttonStyle={styles.btnStyle}
        onPress={props.increaseBtn}
      />
      <Button
        title="-"
        titleStyle={styles.titleStyle}
        buttonStyle={styles.btnStyle}
        onPress={props.decreaseBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnArea: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
  },
  titleStyle: {
    fontSize: 40,
  },
  btnStyle: {
    backgroundColor: "rgba(92, 99,216, 1)",
    padding: 40,
  },
});

export default ButtonGroup;
