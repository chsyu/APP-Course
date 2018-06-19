import React, { Component } from 'react';
import { View, Picker, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';

import { FormLabel, Button, CheckBox } from 'react-native-elements';

import Input from '../components/Input';

// Make a component
import { observer, inject } from 'mobx-react/native';

@inject('store') @observer
class SettingScreen extends Component {
  state = {
    saving: false
  };

  async componentWillMount() {
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

  onSaveInfo = async () => {
    this.setState({ saving: true });
    const { currentUser } = firebase.auth();
    const { email, phone, username, city, gender } = this.props.store.state;
    let dbUserid = firebase.database().ref(`/users/${currentUser.uid}`);
    await dbUserid.set({ email, phone, username, city, gender });
    this.setState({ saving: false });
  }

  renderButton() {
    if (this.state.saving) {
      return <ActivityIndicator size='large' />;
    }

    return (
      <Button
        style={{ marginTop: 10 }}
        title='Save Setting'
        onPress={this.onSaveInfo}
      />
    );
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.formStyle}>
        <FormLabel>Username</FormLabel>
        <Input
          autoCorrect={false}
          placeholder='John Doe'
          value={this.props.store.state.username}
          onChangeText={(username) => this.props.store.state.username=username}
        />
        <FormLabel>Email</FormLabel>
        <Input
          placeholder='user@email.com'
          autoCorrect={false}
          autoCapitalize='none'
          keyboardType='email-address'
          value={this.props.store.state.email}
          onChangeText={(email) => this.props.store.state.email=email}
        />
        <FormLabel>Phone</FormLabel>
        <Input
          autoCorrect={false}
          placeholder='555-555-5555'
          value={this.props.store.state.phone}
          onChangeText={(phone) => this.props.store.state.phone=phone}
        />
        <FormLabel>City</FormLabel>
        <Input
          autoCorrect={false}
          placeholder='Taipei city'
          value={this.props.store.state.city}
          onChangeText={(city) => this.props.store.state.city=city}
        />
        <Picker
          selectedValue={this.props.store.state.gender}
          onValueChange={(gender) => this.props.store.state.gender=gender}
        >
          <Picker.Item label="Mail" value="mail" />
          <Picker.Item label="Femail" value="femail" />
        </Picker>
        {this.renderButton()}
      </View>
    );
  }
}

const styles = {
  formStyle: {
    marginTop: 50
  }
};

export default SettingScreen;
