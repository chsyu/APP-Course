import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DetailScreen = ({ route }) => {
  return (
    <View style={styles.container}>
      <Text>{route.params.title}</Text>
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
