import { useState, useRef } from "react";
import { View, Text, Pressable } from "react-native";

export default () => {
  const [state, setState] = useState(0);
  const ref = useRef(0);
  let variable = 0;
  
  const onPress = () => {
    setState(state + 1);
    ref.current += 1;
    variable += 1;
  }

  return (
    <View style={container}>
      <Pressable onPress={onPress}>
        <Text style={fontStyle}>state = {state}</Text>
        <Text style={fontStyle}>ref = {ref.current}</Text>
        <Text style={fontStyle}>variable = {variable}</Text>
      </Pressable>
    </View>
  );
};

const fontStyle = {fontSize:32, marginBottom: 32},
      container = { 
        flex: 1, justifyContent: 'center', alignItems: 'center' 
      };



