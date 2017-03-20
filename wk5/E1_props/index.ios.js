
import React from 'react';
import { AppRegistry, View } from 'react-native';
import Header from './src/components/Header';

const wk5 = () => (
      <View>
        <Header 
          headerText={'Albums'}
          textColor={'red'}
        />      
      </View>
    );

AppRegistry.registerComponent('wk5', () => wk5);
