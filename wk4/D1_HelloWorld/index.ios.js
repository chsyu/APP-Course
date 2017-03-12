// Import libraries
import React from 'react';
import { AppRegistry, View, Text } from 'react-native';

// Create a component
const App = () => {
    return (
      <View>
        <Text>
          Hello World!
        </Text>
        <Text>
          Hello Again!
        </Text>
      </View>
    );
};

//  Render to devices
AppRegistry.registerComponent('wk4', () => App);


