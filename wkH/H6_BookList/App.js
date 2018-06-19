/* @flow */

import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './src/styles/styles';
import LeftScreen from './src/screens/LeftScreen';
import RightScreen from './src/screens/RightScreen';
import { Provider } from 'mobx-react';
import bookStore from './src/stores/bookStore';

export default class Counter extends Component {

  render() {
    return (
      <Provider store={bookStore} >
        <View style={ styles.container }>
          <LeftScreen />
          <RightScreen />
        </View>
      </Provider>
    );
  }
}

