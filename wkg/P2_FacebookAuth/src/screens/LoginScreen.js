import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";

import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Button, Text } from "react-native-elements";
import axios from "axios";

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

  const doFBLogIn = async () => {
    try {
      //Get Token
      await Facebook.initializeAsync("596563987631240");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await axios.get(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        //Login Firebase
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        await firebase.auth().signInWithCredential(credential);
        const { currentUser } = await firebase.auth();
        if (!currentUser.displayName) {
          await currentUser.updateProfile({
            displayName: response.data.name,
          });
        }
      } else {
        // type === 'cancel'
        return;
      }
    } catch ({ message }) {
      setMsg(`Facebook Login Error: ${message}`);
    }
  };

  const renderLoginButton = () => {
    if (loading) {
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

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setMsg(`${user.displayName || user.email} is login ...`);
      } else {
        setMsg(" ");
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
        {renderLoginButton()}
        <Text style={{ padding: 10, fontSize: 16, color: "gray" }}>{msg}</Text>
      </View>
      <View style={styles.formStyle}>
        <Button
          title="Facebook Login"
          buttonStyle={{ backgroundColor: "#39579A" }}
          containerStyle={{ padding: 5 }}
          onPress={doFBLogIn}
        />
        <Button
          title="Google Login"
          buttonStyle={{ backgroundColor: "#CD5542" }}
          containerStyle={{ padding: 5 }}
        />
      </View>
      <View style={styles.formStyle}>
        <Button
          title="Sign Out"
          buttonStyle={{ backgroundColor: "gray" }}
          containerStyle={{ padding: 5 }}
          onPress={() => {
            firebase.auth().signOut();
            setMsg("");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formStyle: {
    marginTop: 50,
  },
});

export default LoginScreen;
