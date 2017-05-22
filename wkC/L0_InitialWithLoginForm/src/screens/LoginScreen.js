import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormValidationMessage, Button } from 'react-native-elements';
import Input from '../components/Input';

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
               <Input />
               <FormLabel>Password</FormLabel>
               <Input />
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
