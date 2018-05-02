import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel } from 'react-native-elements';
import Input from './components/Input';

// Make a component
class BMIScreen extends Component {
  state = {
    weight: '10',
    height: '10'
  };
  render() {
    const { formStyle, count, inputStyle } = styles;
    return (
      <View>
        <View style={formStyle}>
          <FormLabel>Height</FormLabel>
          <Input
            placeholder='height(cm)'
            keyboardType='numeric'
            value={this.state.height}
            inputStyle={inputStyle}
            onChangeText={height => this.setState({ height })}
          />
          <FormLabel>Weight</FormLabel>
          <Input
            placeholder='weight(kg)'
            value={this.state.weight}
            keyboardType='numeric'
            inputStyle={inputStyle}
            onChangeText={weight => this.setState({ weight })}
          />
       </View>
        <Text style={count}>
          BMI = {Math.round(parseInt(this.state.weight)/parseInt(this.state.height)/parseInt(this.state.height)*10000)}
        </Text>
      </View>
    );
  }
}


const styles = {
  formStyle: {
    marginTop: 150
  },
  count: {
    marginTop: 60,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'gray',
  },
  inputStyle: {
    fontSize: 40,
    textAlign: 'center',
  }
};


export default BMIScreen;
