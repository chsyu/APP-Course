import * as React from "react";
import { Text } from "react-native";

export default (props) => {
  return <Text {...props} style={[props.style, { fontFamily: "vinchand" }]} />;
};
