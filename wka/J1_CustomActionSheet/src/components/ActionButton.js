import React from 'react';
import { Box, Pressable, Actionsheet, useDisclose, Center, Text } from 'native-base';
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
        <Center h="80%" w="100%" bg="#3F3F45" borderRadius={20}>
          <Text>Hello World</Text>
          <Box borderBottomColor={"white"} w={"15%"} h={1} borderRadius={3} bg="grey" position="absolute" top={3}></Box>
          <Pressable onPress={onClose}  position="absolute" top={2} right={3}>
            <Text fontSize={20} color="grey"> X </Text>
          </Pressable>
        </Center>
      </Actionsheet>
    </>
  );
}
