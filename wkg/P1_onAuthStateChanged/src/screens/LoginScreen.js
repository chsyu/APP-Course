import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import { Button, Text } from "react-native-elements";
import Input from "../components/Input";

// Make a component
const LoginScreen = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [msg, setMsg] = useState("  ");
  const [loading, setLoading] = useState(false);

  const onSignIn = async () => {
    setMsg(" ");
    setLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (err1) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
      } catch (err2) {
        setMsg(err2.message);
      }
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  const renderButton = () => {
    return loading? 
    <ActivityIndicator size="large" style={{ marginTop: 15 }} />
    :(
      <Button
        title="Sign in"
        buttonStyle={{ backgroundColor: "#4AAF4C" }}
        containerStyle={{ padding: 5 }}
        onPress={onSignIn}
      />
    );
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setMsg(`${user.email} is login`);
        setEmail(user.email);
      } else {
        setMsg(" ");
        setEmail("");
      }
    });
  }, []);

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
        {renderButton()}
        <Text style={{padding: 10}}>{msg}</Text>
      </View>
      <View style={styles.formStyle}>
        <Button
          title="Sign Out"
          buttonStyle={{ backgroundColor: "gray" }}
          containerStyle={{ padding: 5 }}
          onPress={()=>firebase.auth().signOut()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formStyle: {
    marginTop: 60,
  },
});

export default LoginScreen;
