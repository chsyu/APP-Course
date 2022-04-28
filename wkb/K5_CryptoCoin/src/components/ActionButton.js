import React from 'react';
import { Box, Pressable, useColorMode } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (

    <Pressable onPress={toggleColorMode}>
      <Box mr={4} borderRadius={40} bg={colorMode == "dark" ? "gray.700" : "gray.100"} >
        <Ionicon 
          name={colorMode == 'dark' ? "moon-outline" : "sunny-outline"} 
          color={colorMode === "dark" ? "white" : "black"} size={25} 
        />
      </Box>
    </Pressable>

  );
}
