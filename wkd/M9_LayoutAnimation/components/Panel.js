import React, { useState } from "react";
import {
  Text,
  LayoutAnimation,
  TouchableWithoutFeedback,
  UIManager,
  StyleSheet,
  Platform
} from "react-native";

import { Card } from "react-native-elements";

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  

const Panel = ({ content, title, expanded }) => {
  const [height, setHeight] = useState(expanded ? null : 0);
  const onToggle = () => {
    LayoutAnimation.spring();
    setHeight(height === null ? 0 : null);
  };

  return (
    <TouchableWithoutFeedback onPress={() => onToggle()}>
      <Card style={styles.main}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.content, { height }]}>{content}</Text>
      </Card>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    overflow: "hidden",
    margin: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 15,
    textAlign: "center",
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
});

export default Panel;
