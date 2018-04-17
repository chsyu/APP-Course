import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';

// Make a component
class Contact extends Component {
  static navigationOptions = {
    title: 'Setting',
    tabBarLabel: 'Setting',
    tabBarIcon: ({ tintColor }) => <Icon name="build" size={35} color={tintColor} />
  };

  render() {
    return (
        <ScrollView>
          <List>
            <ListItem
              title="Notifications"
            />
            <ListItem
              title="Profile"
            />
            <ListItem
              title="Password"
            />
          </List>
          <List>
            <ListItem
              title="Sign Out"
              rightIcon={{ name: 'cancel' }}
            />
          </List>
        </ScrollView>
    );
  };
}

export default Contact;
