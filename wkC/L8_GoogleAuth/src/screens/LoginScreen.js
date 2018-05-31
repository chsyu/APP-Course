import React, { Component } from 'react';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';
import * as firebase from 'firebase';
import { FormLabel, FormValidationMessage, Button } from 'react-native-elements';
import Expo, { Facebook } from 'expo';

// import { Confirm, Spinner, Input } from '../components';
import Confirm from '../components/Confirm';
import Spinner from '../components/Spinner';
import Input from '../components/Input';


// Make a component
class LoginScreen extends Component {
  state = {
    email: null,
    password: null,
    error: ' ',
    loading: false,
    // UI toggle switch
    showModal: false,
    showSpinner: false,
    // tokens
    fb_token: null,
    google_idToken: null,
    google_accessToken: null,
    // login status
    status: 'Not Login...'
  };

  googleLogin = async () => {
    console.log('Testing google token....');
    let google_idToken = await AsyncStorage.getItem('google_idToken');
    let google_accessToken = await AsyncStorage.getItem('google_accessToken');

    if (google_idToken) {
      console.log('Already having a token...');
      this.setState({ google_idToken, google_accessToken });

    } else {
      console.log('DO NOT having a token...');
      this.doGoogleLogin();
    }
  }

  doGoogleLogin = async () => {
    console.log('trying login Google ...');
    let result = await Expo.Google.logInAsync({
      androidClientId: '484256935889-kbkb03n9qi4t342049v8051mkssrmt69.apps.googleusercontent.com',
      iosClientId: '484256935889-vaeil3k7a304ed2nit9dc4tcdmn8vfei.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
    let google_idToken = 0, google_accessToken = 0;
    console.log('waiting for result ...');
    console.log(`Google Login ${result.type}`);
    if (result.type === 'success') {
      google_idToken = result.idToken;
      google_accessToken = result.accessToken;
    } else {
      return;
    }

    // Save Google Token locally
    console.log(`google_idToken = ${google_idToken}, google_accessToken = ${google_accessToken}`);
    await AsyncStorage.setItem('google_idToken', google_idToken);
    await AsyncStorage.setItem('google_accessToken', google_accessToken);
    await this.setState({ google_accessToken, google_idToken });

    // Firebase Google Token Login
    const credential = firebase.auth.GoogleAuthProvider.credential(google_idToken, google_accessToken);
    console.log(`credential=${credential}`);
    try {
      await firebase.auth().signInWithCredential(credential);
      const { currentUser } = await firebase.auth();
      this.props.navigation.navigate('UserStack');
    } catch (e2) {
      console.log('Firebase Google login fail ...');
      console.log(`error code is ${e2.code}`);
      console.log(`error message = ${e2.message}`);
      await AsyncStorage.removeItem('google_idToken');
      await AsyncStorage.removeItem('google_accessToken');
      return;
    }
  }

  facebookLogin = async () => {
    console.log('Testing FB token....');
    let fb_token = await AsyncStorage.getItem('fb_token');

    if (fb_token) {
      console.log('Already having a token...');
      this.setState({ fb_token });

    } else {
      console.log('DO NOT having a token...');
      this.doFacebookLogin();
    }
  };

  doFacebookLogin = async () => {

    let { type, token } = await Facebook.logInWithReadPermissionsAsync(
      '113143229250709',
      {
        permissions: ['public_profile'],
        behavior: 'web'
      });

    if (type === 'cancel') {
      console.log('Login Fail!!');
      return;
    }


    // Save Facebook token locally
    let fb_token = token;
    await AsyncStorage.setItem('fb_token', fb_token);
    this.setState({ fb_token });

    // Firebase FB Token Login
    const credential = firebase.auth.FacebookAuthProvider.credential(fb_token);
    console.log(`FB credential = ${credential}`);
    try {
      await firebase.auth().signInWithCredential(credential);
      const { currentUser } = await firebase.auth();
      console.log(`FB currentUser = ${currentUser.uid}`);
      this.props.navigation.navigate('UserStack');
    } catch (e2) {
      console.log('Firebase FB login fail ...');
      return;
    }
  };

  onSignIn = async () => {
    const { email, password } = this.state;
    this.setState({ error: ' ', loading: true });
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      this.props.navigation.navigate('UserStack');
    } catch (err) {
      this.setState({ showModal: true });
    }
  }

  onCreateUser = async () => {
    const { email, password } = this.state;
    try {
      this.setState({
        email: '',
        password: '',
        error: '',
        loading: false,
        showModal: false,
        showSpinner: true
      });

      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const { currentUser } = firebase.auth();
      let dbUserid = firebase.database().ref(`/users/${currentUser.uid}`);
      await dbUserid.set({ email: "", phone: "", username: "", city: "", gender: "" });
      this.setState({ showSpinner: false });
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
        style={{ marginTop: 10 }}
        backgroundColor='#4AAF4C'
        onPress={this.onSignIn}
      />
    );
  }

  async componentDidMount() {
    await AsyncStorage.removeItem('fb_token');
    await AsyncStorage.removeItem('google_idToken');
    await AsyncStorage.removeItem('google_accessToken');
  }



  render() {
    return (
      <View>
        <View style={styles.formStyle}>
          <FormLabel>Email</FormLabel>
          <Input
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='email-address'
            placeholder='user@email.com'
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
            onPress={this.facebookLogin}
          />
          <Button
            style={{ marginTop: 5 }}
            title='Sign in with Google'
            backgroundColor='#dd4b39'
            onPress={this.googleLogin}
          />
        </View>
        <Confirm
          title='Are you sure to create a new user?'
          visible={this.state.showModal}
          onAccept={this.onCreateUser}
          onDecline={this.onCLoseModal}
        />
        <Spinner
          visible={this.state.showSpinner}
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