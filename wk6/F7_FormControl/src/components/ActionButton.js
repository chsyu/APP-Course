import React from 'react';
import { Box, Pressable, Actionsheet, useDisclose } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default () => {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <>
      <Pressable
        onPress={onOpen}
        position="absolute" left={"50%"} right={"50%"} bottom={"5%"} ml={-25}
        width={50} height={50} borderRadius={300}
        bg="#0e7490" shadow={2} justifyContent="center" alignItems="center" zIndex={99} 
      >
        <Box>
          <MaterialCommunityIcons name="plus" color="white" size={30} />
        </Box>
      </Pressable>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Header>Header</Actionsheet.Header>
          <Actionsheet.Item>Option 1</Actionsheet.Item>
          <Actionsheet.Item>Option 2</Actionsheet.Item>
          <Actionsheet.Item>Option 3</Actionsheet.Item>
          <Actionsheet.Item color="red.500">Delete</Actionsheet.Item>
        </Actionsheet.Content>
        <Actionsheet.Footer safeAreaBottom={true}>
          <Actionsheet.Item pl="6" onPress={onClose}>Cancel</Actionsheet.Item>
        </Actionsheet.Footer>          
      </Actionsheet>
    </>
  );
}
