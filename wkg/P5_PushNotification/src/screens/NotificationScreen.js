import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Vibration } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import * as firebase from "firebase";
import { Button } from "react-native-elements";
import axios from "axios";

import Input from "../components/Input";
import { StoreContext } from "../stores";

const NTUE_PUSH_ENDPOINT = "https://ntuepushserver.herokuapp.com/tokens";
const EXPO_PUSH_ENDPOINT = "https://exp.host/--/api/v2/push/send";

// Make a component
const NotificationScreen = ({ navigation }) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [sendMsg, setSendMsg] = useState("");
  const [receivedMsg, setReceivedMsg] = useState("");
  const { isLoginState } = useContext(StoreContext);
  const [isLogin, setIsLogin] = isLoginState;


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
      const token = await Notifications.getExpoPushTokenAsync();
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
    setReceivedMsg(text);
  };

  const sendPushNotification = async () => {
    let message = {  //for EXPO PUSH SERVER
      to: expoPushToken,
      sound: "default",
      title: "Original Title",
      body: "And here is the body!",
      data: { text: sendMsg },
      _displayInForeground: true,
    };

    // let message = {
    //   //for NTUE PUSH SERVER
    //   token: expoPushToken,
    //   message: sendMsg,
    // };

    try {
      await axios.post(EXPO_PUSH_ENDPOINT, message);
      // await axios.post(NTUE_PUSH_ENDPOINT, message);
    } catch (e) {
      console.log(e);
    }
  };

  const onSignOut = () => {
    firebase.auth().signOut();
    setIsLogin(false);
  };

  const onHandlePushNotification = () => {
    registerForPushNotificationsAsync();
    Notifications.addListener(_handleNotification);  
  };

  useEffect(() => onHandlePushNotification(), []);

  return (
    <View style={styles.formStyle}>
      <Input
        labelStyle={{ marginTop: 20 }}
        label="Notification Message"
        placeholder="Enter your push message here ..."
        autoCorrect={false}
        autoCapitalize="none"
        value={sendMsg}
        onChangeText={(sendMsg) => setSendMsg(sendMsg)}
      />
      <View style={styles.msgStyle}>
        <Text style={styles.msgTitleStyle}>The received message: </Text>
        <Text style={styles.msgContentStyle}>{receivedMsg}</Text>
      </View>
      <Button
        title="Send Notification"
        buttonStyle={{ backgroundColor: "black" }}
        containerStyle={{ marginTop: 50, padding: 5 }}
        onPress={sendPushNotification}
      />
      <Button
        style={{ marginTop: 100 }}
        title="Sign out"
        buttonStyle={{ backgroundColor: "#F8671D" }}
        containerStyle={{ padding: 5 }}
        onPress={onSignOut}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formStyle: {
    flex: 1,
    marginTop: 150,
  },
  msgStyle: {
    flexDirection: 'row',
  },
  msgTitleStyle: {
    fontWeight: 'bold',
    fontSize: 16, 
    paddingLeft: 10,
  },
  msgContentStyle: {
    fontSize: 16,
  }
});

export default NotificationScreen;
