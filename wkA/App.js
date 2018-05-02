/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default class Counter extends Component {
  state = {
    currentCount: 0
  };
  render() {
    const { container, btnArea, btnStyle, count } = styles;
    return (
      <View style={container}>
        <View style={btnArea}>
          <Button
            title='+'
            textStyle={{fontSize: 60}}
            buttonStyle={btnStyle}
            onPress={() => this.setState({currentCount: this.state.currentCount+1})}
          />
          <Button
            title='-'
            textStyle={{fontSize: 60}}
            buttonStyle={btnStyle}
            onPress={() => this.setState({currentCount: this.state.currentCount-1})}
          />
        </View>
        <Text style={count}>{this.state.currentCount}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  btnArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
    backgroundColor: "rgba(92, 99,216, 1)",
    width: 100,
  },
  count: {
    marginTop: 60,
    textAlign: 'center',
    fontSize: 60,
    fontWeight: 'bold'
  }
});
