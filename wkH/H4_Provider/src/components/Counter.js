import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { observer, inject } from 'mobx-react/native';

@inject('store') @observer
class Counter extends Component {
  render() {
    const { container, btnArea, btnStyle, counter } = styles;
    // let { store } = this.props;
    return (
        <View style={container}>
            <View style={btnArea}>
                <Button
                    title='+'
                    textStyle={{fontSize: 60}}
                    buttonStyle={btnStyle}
                    onPress={this.props.store.incCounter}
                />
                <Button
                    title='-'
                    textStyle={{fontSize: 60}}
                    buttonStyle={btnStyle}
                    onPress={this.props.store.decCounter}
                />
            </View>
            <Text style={counter}>{this.props.store.count}</Text>
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
  counter: {
    marginTop: 60,
    textAlign: 'center',
    fontSize: 60,
    fontWeight: 'bold'
  }
});

export default Counter;
