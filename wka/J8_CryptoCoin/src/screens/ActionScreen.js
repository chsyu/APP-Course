import React from 'react';
import {
   Box, VStack,
   Switch, HStack,
   Text, Pressable,
   useColorMode
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const ActionScreen = ({ onClose }) => {
   const { colorMode, toggleColorMode } = useColorMode();

   return (

      <VStack 
         _dark={{ bg: "blueGray.900" }}
         _light={{ bg: "blueGray.50" }} 
         h="30%" w="100%" bg="#3F3F45" borderRadius={20} alignItems="center"
      >
         <Pressable onPress={onClose} position="absolute" top={2} right={3}>
            <MaterialCommunityIcons name="close" color="gray" size={30} />
         </Pressable>
         <Box borderBottomColor={"white"} w={"15%"} h={1} borderRadius={3} bg="grey" position="absolute" top={3}></Box>
         <HStack space={8} justifyContent="center" alignItems="center" shadow={2} width="80%" mt="20" px="2" py="4"
            _dark={{ bg: "blueGray.800", borderColor: 'blueGray.500', borderWidth: 0.6 }}
            _light={{ bg: "white" }}
            borderRadius="md">
            <Text fontSize="lg">{colorMode == "light" ? "Light Mode" : "Dark Mode"}</Text>
            <Switch
               name="light Mode"
               isChecked={colorMode === "light"}
               onToggle={toggleColorMode}
               accessibilityLabel="display-mode"
               accessibilityHint="light or dark mode"
            />
         </HStack>
      </VStack>
   );
};

export default ActionScreen;
