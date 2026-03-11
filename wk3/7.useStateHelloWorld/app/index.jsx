import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function CounterApp() {
  const [count, setCount] = useState(1);

  const buttonStyle = ({ pressed }) => [
    styles.squareButton,
    {
      backgroundColor: pressed ? '#008BA3' : '#00A9C6',
    }
  ];

  return (
    <View style={styles.container}>
      
      <View style={styles.buttonContainer}>
        
        <Pressable 
          style={buttonStyle}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>

        <Pressable 
          style={buttonStyle}
          onPress={() => setCount(count - 1)}
        >
          <Text style={styles.buttonText}>−</Text>
        </Pressable>
        
      </View>

      {/* 數字顯示區域 */}
      <View style={styles.counterWrapper}>
        <Text style={styles.counterText}>{count}</Text>
      </View>

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
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 60,
  },
  squareButton: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    borderRadius: 4, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // 陰影 (Android)
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '300',
  },
  counterWrapper: {
    marginTop: 20,
  },
  counterText: {
    fontSize: 64, // 放大數字字體
    color: '#333',
    fontWeight: '400',
  },
});