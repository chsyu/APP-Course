import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Card, Text } from 'react-native-elements';

// Make a component
class Login extends Component {

   goToTab = () => {
      this.props.navigation.navigate('TabRouter');
   };

   render() {
      return (
         <Card
            title='LOGIN PAGE'
            image={require('../assets/ntue.jpg')}
            imageWrapperStyle={{ height: 120 }}
         >
            <Text style={{ marginBottom: 10 }}>
               Please press the button ....
            </Text>
            <Button
               raised
               title='To Tab'
               onPress={this.goToTab}
            />
         </Card>

      );
   }
}

export default Login;
