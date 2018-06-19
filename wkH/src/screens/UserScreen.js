import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import * as firebase from 'firebase';
import { Tile, List, ListItem, Button } from 'react-native-elements';
// import me from '../json/me.json';

// Make a component
import { observer, inject } from 'mobx-react/native';

@inject('store') @observer
class UserScreen extends Component {

  async componentDidMount() {
    const { currentUser } = firebase.auth();
    let dbUserid = firebase.database().ref(`/users/${currentUser.uid}`);
    try {
      let snapshot = await dbUserid.once('value');
      let username = snapshot.val().username;
      let email = snapshot.val().email;
      let city = snapshot.val().city;
      let phone = snapshot.val().phone;
      let gender = snapshot.val().gender;

      this.props.store.state = ({ username, email, city, phone, gender });
    } catch (err) { }
  }

  onSignOut = () => {
    firebase.auth().signOut();
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