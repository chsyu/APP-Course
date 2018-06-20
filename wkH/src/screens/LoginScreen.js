import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import { FormLabel, FormValidationMessage, Button } from 'react-native-elements';

import Input from '../components/Input';
import Confirm from '../components/Confirm';

// Injection Store
import { observer, inject } from 'mobx-react/native';

// Make a component
@inject('store') @observer
class LoginScreen extends Component {
  state = {
    email: null,
    password: null,
    error: ' ',
    loading: false,
    showModal: false
  };

  onSignIn = async () => {
    const { email, password } = this.state;
    this.setState({ error: ' ', loading: true });
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      this.setState({email: '', password: '', loading: false});
      const currentUser = await firebase.auth().currentUser;
      let dbUserid = firebase.database().ref(`/users/${currentUser.uid}`);
      try {
        let snapshot = await dbUserid.once('value');
        console.log(snapshot);
        this.props.store.state = ({ ...snapshot.val() });
      } catch (err) {console.log(err); }  
      this.props.navigation.navigate('UserStack');
    } catch (err) {
      this.setState({ showModal: true });
    }
  }

  onCreateUser = async () => {
    const { email, password } = this.state;
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      this.setState({ showModal: false, email: '', password: '', loading: false });
      this.props.navigation.navigate('UserStack');
    } catch (err) {
      this.setState({
        email: '',
        password: '',
        error: err.message,
        loading: false,
        showModal: false
      });
    }
  }

  onCLoseModal = () => {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false,
      showModal: false
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size='large' style={{ marginTop: 30 }} />;
    }

    return (
      <Button
        title='Sign in'
        backgroundColor='#4AAF4C'
        onPress={this.onSignIn}
      />
    );
  }

  render() {
    return (
      <View>
        <View style={styles.formStyle}>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder='user@email.com'
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='email-address'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <FormLabel>Password</FormLabel>
          <Input
            secureTextEntry
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='password'
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          {this.renderButton()}
          <FormValidationMessage>{this.state.error}</FormValidationMessage>
        </View>
        <View style={styles.formStyle}>
          <Button
            title='Sign in with Facebook'
            backgroundColor='#39579A'
          />
        </View>
        <Confirm
          title='Are you sure to create a new user?'
          visible={this.state.showModal}
          onAccept={this.onCreateUser}
          onDecline={this.onCLoseModal}
        />
      </View>
    );
  }
}

const styles = {
  formStyle: {
    marginTop: 150
  }
};

export default LoginScreen;