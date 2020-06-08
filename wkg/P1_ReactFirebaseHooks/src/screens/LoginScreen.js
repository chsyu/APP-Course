import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useAuthState } from "react-firebase-hooks/auth";

import { Button, Text } from "react-native-elements";
import Input from "../components/Input";


// Make a component
const LoginScreen = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, loading1, error1] = useAuthState(firebase.auth());

  const onSignIn = async () => {
    setError(" ");
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const renderAuth = () => {
    
    if (user) {
      return <Text style={{padding: 10}}>{user.email} is login</Text>;
    } else {
      return <Text></Text>
    }
  };

  const renderButton = () => {
    if (error1) {
      return <ActivityIndicator size="large" style={{ marginTop: 30 }} />;
    }

    return (
      <Button
        title="Sign in"
        buttonStyle={{ backgroundColor: "#4AAF4C" }}
        containerStyle={{ padding: 5 }}
        onPress={onSignIn}
      />
    );
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
        {renderButton()}
        {renderAuth()}
        <Text style={{ padding: 10, fontSize: 16, color: "red" }}>{error}</Text>
      </View>
      <View style={styles.formStyle}>
        <Button
          title="Sign Out"
          buttonStyle={{ backgroundColor: "#39579A" }}
          containerStyle={{ padding: 5 }}
          onPress={()=>firebase.auth().signOut()}
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
