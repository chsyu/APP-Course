import React, { useState } from "react";
import * as firebase from "firebase";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import Input from "../components/Input";

// Make a component
const LoginScreen = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState("");
  console.log(`email=${email}`);
  console.log(`password=${password}`);
  const onSignIn = async () => {
    setError(" ");
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (err1) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        setEmail("");
        setPassword("");
        setError("");
      } catch (err2) {
        setError(err2.message);
      }
    }
  };
  return (
    <View>
      <View style={styles.formStyle}>
        <Input
          labelStyle={{ marginTop: 20 }}
          label="Email"
          placeholder="ntue@dtd.com"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <Input
          labelStyle={{ marginTop: 20 }}
          label="Password"
          placeholder="Must have at least 7 characters"
          secureTextEntry
          autoCorrect={false}
          autoCapitalize="none"
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
        <Button
          title="Sign in"
          buttonStyle={{ backgroundColor: "#4AAF4C" }}
          containerStyle={{ padding: 5 }}
          onPress={onSignIn}
        />
        <Text style={{padding: 10}}>{error}</Text>
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
