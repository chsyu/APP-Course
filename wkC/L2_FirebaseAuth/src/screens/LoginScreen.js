import React, { Component } from 'react';
import { View } from 'react-native';
import * as firebase from 'firebase';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

// Make a component
class LoginScreen extends Component {
  state = {
    email: null,
    password: null,
    error: ' '
  };

  onSignIn = async () => {
    const { email, password } = this.state;
    this.setState({ error: ' ' });
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (err1) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        this.setState({
          email: '',
          password: '',
          error: ''
        });
      } catch (err2) {
        this.setState({ error: err2.message });
      }
    }
  }

  render() {
    return (
      <View>
        <View style={styles.formStyle}>
          <FormLabel>Email</FormLabel>
          <FormInput
            placeholder='user@email.com'
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='email-address'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='password'
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          <Button
            title='Sign in'
            backgroundColor='#4AAF4C'
            onPress={this.onSignIn}
          />
          <FormValidationMessage>{this.state.error}</FormValidationMessage>
        </View>
        <View style={styles.formStyle}>
          <Button
            title='Sign in with Facebook'
            backgroundColor='#39579A'
          />
        </View>
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
