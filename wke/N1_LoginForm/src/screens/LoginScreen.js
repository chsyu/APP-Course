import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Input from "../components/Input";

// Make a component
const LoginScreen = () => {

  return (
    <View>
      <View style={styles.formStyle}>
        <Input
          labelStyle={{ marginTop: 20 }}
          label="Email"
          placeholder="ntue@dtd.com"
        />
        <Input
          labelStyle={{ marginTop: 20 }}
          label="Password"
          placeholder="Must have at least 7 characters"
        />
        <Button
          title="Sign in"
          buttonStyle={{ backgroundColor: "#4AAF4C" }}
          containerStyle={{ padding: 5 }}
        />
      </View>
      <View style={styles.formStyle}>
        <Button
          title="Sign in with Facebook"
          buttonStyle={{ backgroundColor: "#39579A" }}
          containerStyle={{ padding: 5 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formStyle: {
    marginTop: 150,
  },
});

export default LoginScreen;
