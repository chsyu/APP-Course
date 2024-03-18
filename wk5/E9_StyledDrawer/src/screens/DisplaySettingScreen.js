import React from 'react';
import { Center, Switch, HStack, Text } from '@gluestack-ui/themed';

const DisplaySettingScreen = () => {
  return (
     <Center
      shadow={2} width="90%"
      mt="$2" px="$2" py="$4"
      bg="white" borderRadius={3} 
      alignSelf="center"
     >
      <HStack space={8} alignItems="center" >
         <Text size="lg" px="$2">Light Mode</Text>
         <Switch
            name="light Mode"
            size='md'
            accessibilityLabel="display-mode"
            accessibilityHint="light or dark mode"
         />
      </HStack>        
     </Center>
  );
};

export default DisplaySettingScreen;
