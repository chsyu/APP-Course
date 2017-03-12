// import libraries
import React from 'react';
import { 
         StyleSheet, 
         Text, 
         View 
      } from 'react-native';

// Create a component
const Header = () => { 
   const { container, box } = styles;
   return (
      <View style={container} >
         <Text style={box}>Box1</Text>
         <Text style={box}>Box2</Text>
         <Text style={box}>Box3</Text>
      </View>
   ); 
};

// styling components
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'yellow',
      // flexDirection: 'row',
   },
   box: {
      flex: 1,
      backgroundColor: 'gray',
      color: 'white',
      margin: 20,
      padding: 20,
      textAlign: 'center',
      fontSize: 18,
   },
});

// export this component
export default Header;
