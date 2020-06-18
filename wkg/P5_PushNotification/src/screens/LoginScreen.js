import React, { useState, useEffect, useContext } from "react";
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";


import {
  View,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import { Button, Text } from "react-native-elements";
import axios from "axios";

import Input from "../components/Input";
import { StoreContext } from "../stores";

const ANDROID_CLIENT_ID =
  "832044128799-7igvvesric35jcavh8afph1ni709d9bl.apps.googleusercontent.com";
const IOS_CLIENT_ID =
  "832044128799-ksgfd6t049fugucoip47k9obm3cqfb5r.apps.googleusercontent.com";

// Make a component
const LoginScreen = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [msg, setMsg] = useState("  ");
  const [loading, setLoading] = useState(false);
  const { isLoginState } = useContext(StoreContext);
  const [isLogin, setIsLogin] = isLoginState;
  
  const onSignIn = async () => {
    setMsg(" ");
    setLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setIsLogin(true);
    } catch (err1) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        setIsLogin(true);
      } catch (err2) {
        setMsg(err2.message);
      }
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  const askFBTokenAndLogin = async () => {
    const token = await AsyncStorage.getItem("fb_token");
    if (token) {
      doFBLogin(token);
    } else {
      try {
        await Facebook.initializeAsync("596563987631240");
        const { type, token } = await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile"],
        });
        if (type === "success") {
          await AsyncStorage.setItem("fb_token", token);
          doFBLogin(token);
        } else {
          // type === 'cancel'
          return;
        }
      } catch ({ message }) {
        setMsg(`Facebook Login Error: ${message}`);
      }
    }
  };

  const doFBLogin = async (token) => {
    const response = await axios.get(
      `https://graph.facebook.com/me?access_token=${token}`
    );
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    try {
      await firebase.auth().signInWithCredential(credential);
      const { currentUser } = await firebase.auth();
      if (!currentUser.displayName) {
        await currentUser.updateProfile({
          displayName: `Facebook's ${response.data.name}`,
        });
      }
      setIsLogin(true);
    } catch (e) {
      setMsg(e.message);
      // AsyncStorage.removeItem("fb_token");
      return;
    }
  };

  const askGoogleTokenAndLogin = async () => {
    const idToken = await AsyncStorage.getItem("google_idToken");
    const accessToken = await AsyncStorage.getItem("google_accessToken");

    if (idToken) {
      try {
        doGoogleLogin(idToken, accessToken);
      } catch (e) {
        AsyncStorage.removeItem("google_accessToken");
        AsyncStorage.removeItem("google_idToken");
      }
    } else {
      try {
        const { type, accessToken, idToken, user } = await Google.logInAsync({
          androidClientId: ANDROID_CLIENT_ID,
          iosClientId: IOS_CLIENT_ID,
          scopes: ["profile", "email"],
        });
        if (type === "success") {
          await AsyncStorage.setItem("google_idToken", idToken);
          await AsyncStorage.setItem("google_accessToken", accessToken);
          doGoogleLogin(idToken, accessToken, user);
        } else {
          return { cancelled: true };
        }
      } catch (e) {
        return { error: true };
      }
    }
  };

  const doGoogleLogin = async (idToken, accessToken, user) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/userinfo/v2/me?oauth_token=${accessToken}`
      );
    } catch (e) {

    }

    // Firebase Google Token Login
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken);

    try {
      await firebase.auth().signInWithCredential(credential);
      const { currentUser } = await firebase.auth();
      if (!currentUser.displayName) {
        await currentUser.updateProfile({
          // displayName: `Google's ${response.data.name}`,
          displayName: `Google's ${user.name}`,
        });
      }
      setIsLogin(true);
    } catch (e2) {
      AsyncStorage.removeItem("google_accessToken");
      AsyncStorage.removeItem("google_idToken");
      return;
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
        setMsg(`${user.displayName ||user.email} is login ...`);
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
          onPress={askFBTokenAndLogin}
        />
        <Button
          title="Google Login"
          buttonStyle={{ backgroundColor: "#CD5542" }}
          containerStyle={{ padding: 5 }}
          onPress={askGoogleTokenAndLogin}
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
