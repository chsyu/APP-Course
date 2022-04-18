import React from 'react';
import { Box, Pressable, Actionsheet, useDisclose, useColorMode } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionScreen from '../screens/ActionScreen';

export default () => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const { colorMode } = useColorMode();

  return (
    <>
      <Pressable onPress={onOpen}>
        <Box mr={4}>
          <MaterialCommunityIcons name="cog" color={colorMode === "dark" ? "white" : "gray"} size={25} />
        </Box>
      </Pressable>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <ActionScreen onClose={onClose}/>
      </Actionsheet>
    </>
  );
}
