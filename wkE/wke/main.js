import Expo, { Notifications } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';

import registerForNotifications from './services/push_notifications';

class App extends React.Component {

  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
      console.log(notification);
      const { data: { text }, origin } = notification;

      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'Ok.' }]
        );
      }
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30, textAlign: 'center', margin: 20 }}>
          This is an APP for testing push notifications!!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);
