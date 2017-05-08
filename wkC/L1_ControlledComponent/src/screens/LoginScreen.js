import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

// Make a component
class LoginScreen extends Component {
  state = {
    email: null,
    password: null
  };
  render() {
    console.log(this.state);
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
          />
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
