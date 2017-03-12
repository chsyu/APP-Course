// import libraries
import React from 'react';
import { 
         StyleSheet, 
         Text, 
         View,
      } from 'react-native';

// Create a component
const Header = () => { 
   const { container, circle, box } = styles;
   return (
      <View style={container} >
         <View style={circle}>
            <Text style={box}>+</Text>
         </View>
         <View style={circle}>
            <Text style={box}>+</Text>
         </View>
         <View style={circle}>
            <Text style={box}>+</Text>
         </View>
      </View>
   ); 
};

// styling components
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'lightgray',
      alignItems: 'center', 
   },
   circle: {
      backgroundColor: '#ff5722',
      borderColor: '#ff5722',
      margin: 20,
      width: 100,
      height: 100,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000000',
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
         height: 1,
         width: 0
      }
   },
   box: {
      color: 'white',
      fontSize: 50,
      fontWeight: '100',
   },
});

// export this component
export default Header;
