// import libraries
import React from 'react';
import { StyleSheet, Text } from 'react-native';

// Create a component
const Header = () => { 
   const { textStyle, red } = styles;
   return <Text style={[textStyle, red]}>First APP</Text>; 
};

// styling components
const styles = StyleSheet.create({
   textStyle: {
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'AppleSDGothicNeo-Thin', 
      fontStyle: 'italic'
   },
   red: {
      color: 'red'
   }
});

// export this component
export default Header;
