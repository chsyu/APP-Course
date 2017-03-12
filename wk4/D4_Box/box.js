// import libraries
import React from 'react';
import { 
         StyleSheet, 
         Text, 
         View 
      } from 'react-native';

// Create a component
const Header = () => { 
   const { box, yellow, red } = styles;
   return (
      <View>
         <Text style={[box, yellow]}>Box1</Text>
         <Text style={[box, red]}>Box2</Text>
      </View>
   ); 
};

// styling components
const styles = StyleSheet.create({
   box: {
      fontSize: 20,
      fontWeight: 'bold',
      height: 313.5,
      width: 355,
      padding: 10,
      margin: 10,
   },
   yellow: {
      backgroundColor: 'yellow',
   },
   red: {
      backgroundColor: 'red',
   }
});

// export this component
export default Header;
