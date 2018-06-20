import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import * as firebase from 'firebase';
import { Tile, List, ListItem, Button } from 'react-native-elements';
// import me from '../json/me.json';

// Injection Store
import { observer, inject } from 'mobx-react/native';

@inject('store') @observer
class UserScreen extends Component {

  onSignOut = () => {
    firebase.auth().signOut();
    this.props.store.clearPersonalStore();
    this.props.navigation.navigate('LoginScreen');
  }

  render() {
    const { email, phone, username, city, gender } = this.props.store.state;
    return (
      <ScrollView>
        <List>
          <ListItem
            title="Email"
            rightTitle={email}
            hideChevron
          />
          <ListItem
            title="Phone"
            rightTitle={phone}
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title="Username"
            rightTitle={username}
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title="Gender"
            rightTitle={gender}
            hideChevron
          />
          <ListItem
            title="City"
            rightTitle={city}
            hideChevron
          />
        </List>
        <Button
          style={{ flex: 1, marginTop: 10 }}
          title='Sign out'
          onPress={this.onSignOut}
        />
      </ScrollView>
    );
  }
}

export default UserScreen;