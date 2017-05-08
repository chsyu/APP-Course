import React, { Component } from 'react';
import { View } from 'react-native';
import * as firebase from 'firebase';
import { Button } from 'react-native-elements';

// Make a component
class UserScreen extends Component {
  onSignOut = () => {
    firebase.auth().signOut();
    this.props.navigation.navigate('LoginScreen');
  }

  render() {
    return (
      <View style={styles.formStyle}>
        <Button
          title='Sign out'
          backgroundColor='#F8671D'
          onPress={this.onSignOut}
        />
      </View>
    );
  }
}

const styles = {
  formStyle: {
    marginTop: 250
  }
};

export default UserScreen;