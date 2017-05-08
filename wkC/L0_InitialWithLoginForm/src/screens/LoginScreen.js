import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

// Make a component
class LoginScreen extends Component {
   state = {
      formInputMsg1: null
   };
   render() {
      return (
         <View>
            <View style={styles.formStyle}>
               <FormLabel>Email</FormLabel>
               <FormInput />
               <FormLabel>Password</FormLabel>
               <FormInput />
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
