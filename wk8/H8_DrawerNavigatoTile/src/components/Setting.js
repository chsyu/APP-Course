import React from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';

// Make a component
const Contact = () => {

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

export default Contact;
