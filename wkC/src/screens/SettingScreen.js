import React, { Component } from 'react';
import { View, Picker, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';

import { Button, CheckBox, FormLabel } from 'react-native-elements';
// import { Input } from '../components';
import Input from '../components/Input';

// Make a component
class SettingScreen extends Component {
  state = {
    email: null,
    phone: null,
    username: null,
    city: null,
    gender: 'mail',
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

      this.setState({ username, email, city, phone, gender });
    } catch (err) { }
  }

  onSaveInfo = async () => {
    this.setState({ saving: true });
    const { currentUser } = firebase.auth();
    const { email, phone, username, city, gender } = this.state;
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
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
          />
        <FormLabel>Email</FormLabel>
          <Input
            placeholder='user@email.com'
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='email-address'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        <FormLabel>Phone</FormLabel>
          <Input
            autoCorrect={false}
            placeholder='555-555-5555'
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
          />
        <FormLabel>City</FormLabel>
          <Input
            autoCorrect={false}
            placeholder='Taipei city'
            value={this.state.city}
            onChangeText={city => this.setState({ city })}
          />
        <Picker
          selectedValue={this.state.gender}
          onValueChange={gender => this.setState({ gender })}
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
