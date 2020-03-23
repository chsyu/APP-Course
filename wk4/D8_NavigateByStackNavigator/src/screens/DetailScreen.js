import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is Page 2!</Text>
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

export default DetailScreen;
