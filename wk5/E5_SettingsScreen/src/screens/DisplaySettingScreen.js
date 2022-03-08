import React from 'react';
import { Center, Switch, HStack, Text } from 'native-base';

const DisplaySettingScreen = () => {
  return (
     <Center
      shadow={2} width="90%"
      mt="2" px="2" py="4"
      bg="white" borderRadius="md" 
      alignSelf="center"
     >
      <HStack space={8} alignItems="center" >
         <Text fontSize="lg">Light Mode</Text>
         <Switch
            name="light Mode"
            accessibilityLabel="display-mode"
            accessibilityHint="light or dark mode"
         />
      </HStack>        
     </Center>
  );
};

export default DisplaySettingScreen;
