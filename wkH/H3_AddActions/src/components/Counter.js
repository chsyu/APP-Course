import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { observer, inject } from 'mobx-react/native';

@observer
class Counter extends Component {
  render() {
    const { container, btnArea, btnStyle, counter } = styles;
    return (
        <View style={container}>
            <View style={btnArea}>
                <Button
                    title='+'
                    textStyle={{fontSize: 60}}
                    buttonStyle={btnStyle}
                    onPress={this.props.counterStore.incCounter}
                />
                <Button
                    title='-'
                    textStyle={{fontSize: 60}}
                    buttonStyle={btnStyle}
                    onPress={this.props.counterStore.decCounter}
                />
            </View>
            <Text style={counter}>{this.props.counterStore.count}</Text>
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
