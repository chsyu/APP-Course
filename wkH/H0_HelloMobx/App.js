import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

@observer class App extends Component {
   @observable count = 0;

   render() {
    const { container, btnArea, btnStyle, count } = styles;
    return (
        <View style={container}>
            <View style={btnArea}>
                <Button
                    title='+'
                    textStyle={{fontSize: 60}}
                    buttonStyle={btnStyle}
                    onPress={() => this.count+= 1}
                />
                <Button
                    title='-'
                    textStyle={{fontSize: 60}}
                    buttonStyle={btnStyle}
                    onPress={() => this.count-= 1}
                />
            </View>
            <Text style={count}>{this.count}</Text>
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

export default App;
