import React from "react";
import { ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';

// Make a component
const SettingsScreen = ({ navigation }) => {
    return (
        <ScrollView style={{paddingTop: 44}}>
            <ListItem
              title="Notifications"
            />
            <ListItem
              title="Profile"
            />
            <ListItem
              title="Password"
            />
            <ListItem
              title="Sign Out"
              rightIcon={{ name: 'cancel' }}
            />
        </ScrollView>
    );
}

export default SettingsScreen;
