import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  Vibration,
} from "react-native";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Text } from "react-native-elements";
import axios from 'axios';

import Input from "../components/Input";

const ANDROID_CLIENT_ID =
  "832044128799-7igvvesric35jcavh8afph1ni709d9bl.apps.googleusercontent.com";
const IOS_CLIENT_ID =
  "832044128799-ksgfd6t049fugucoip47k9obm3cqfb5r.apps.googleusercontent.com";
const NTUE_PUSH_ENDPOINT = 'https://ntuepushserver.herokuapp.com/tokens';
const EXPO_PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send';



// Make a component
const LoginScreen = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [msg, setMsg] = useState("  ");
  const [loading, setLoading] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState("");
  const [user] = useAuthState(firebase.auth());

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        // alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      setExpoPushToken(token);
    } else {
      // alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  const _handleNotification = (_notification) => {
    const {
      data: { text },
      orign,
    } = _notification;
    Vibration.vibrate();
    console.log(_notification);
    setNotification(text);
  };

  const sendPushNotification = async () => {
    // let message = {  //for EXPO PUSH SERVER
    //   to: expoPushToken,
    //   sound: "default",
    //   title: "Original Title",
    //   body: "And here is the body!",
    //   data: { text: "goes here" },
    //   _displayInForeground: true,
    // };

    let message = { //for NTUE PUSH SERVER
      token: expoPushToken,
      message: "Hello Push..."
    };

    try {
      // await axios.post(EXPO_PUSH_ENDPOINT, message);
      await axios.post(NTUE_PUSH_ENDPOINT, message);
    } catch(e) {
      console.log(e);
    }
  };

  const onSignIn = async () => {
    setMsg(" ");
    setLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      if (user) setMsg(`${user.email} is login...`);
    } catch (err1) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        if (user) setMsg(`${user.email} is login...`);
      } catch (err2) {
        setMsg(err2.message);
      }
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  const getFBToken = async () => {
    const token = await AsyncStorage.getItem("fb_token");

    if (token) {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      setMsg(`${(await response.json()).name} is login...`);
    } else {
      doFBLogIn();
    }
  };

  const doFBLogIn = async () => {
    try {
      await Facebook.initializeAsync("596563987631240");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        await AsyncStorage.setItem("fb_token", token);
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        setMsg(`${(await response.json()).name} is login...`);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        // Sign in with credential from the Facebook user.
        try {
          await firebase.auth().signInAndCredential(credential);
          const { currentUser } = await firebase.auth();
          setMsg(`${msg} and userID = ${currentUser.uid}`);
        } catch (err) {}
      } else {
        // type === 'cancel'
        return;
      }
    } catch ({ message }) {
      setMsg(`Facebook Login Error: ${message}`);
    }
  };

  const doGoogleLogIn = async () => {
    try {
      const { type, accessToken, user } = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (type === "success") {
        setMsg(`${user.name} is login ...`);
        await AsyncStorage.setItem("google_token", token);
        return accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
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
    registerForPushNotificationsAsync();
    Notifications.addListener(_handleNotification);
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

        <Text style={{ padding: 10, fontSize: 16, color: "gray" }}>
          The received push info = {notification}
        </Text>
      </View>
      <View style={styles.formStyle}>
        <Button
          title="Facebook Login"
          buttonStyle={{ backgroundColor: "#39579A" }}
          containerStyle={{ padding: 5 }}
          onPress={getFBToken}
        />
        <Button
          title="Google Login"
          buttonStyle={{ backgroundColor: "#CD5542" }}
          containerStyle={{ padding: 5 }}
          onPress={doGoogleLogIn}
        />
      </View>
      <View style={styles.formStyle}>
        <Button
          title="Send Notification"
          buttonStyle={{ backgroundColor: "black" }}
          containerStyle={{ padding: 5 }}
          onPress={sendPushNotification}
        />
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
    marginTop: 30,
  },
});

export default LoginScreen;
