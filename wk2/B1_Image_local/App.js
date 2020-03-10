import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Image source={require("./imgs/beach.jpg")} />
      <Text>beach</Text>
      <Image source={require("./imgs/forest.jpg")} />
      <Text>forest</Text>
      <Image source = {require('./imgs/mountain.jpg')} />
      <Text>mountain</Text>    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;