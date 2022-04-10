import React from 'react';
import { Box, Center, Switch, HStack, Text, useColorMode } from 'native-base';
import { useDispatch } from "react-redux";

import { setColorMode } from '../redux/store/settingsSlice';

const DisplaySettingScreen = () => {
   const { colorMode, toggleColorMode } = useColorMode();
   const dispatch = useDispatch();

   const onToggleColorMode = () => {
      if(colorMode == 'light') dispatch(setColorMode("dark"))
      else dispatch(setColorMode("light"))
      toggleColorMode();
   }

   return (
      <Box
         flex={1}
         _dark={{ bg: "blueGray.900" }}
         _light={{ bg: "blueGray.50" }}
      >
         <Center
            shadow={2} width="90%"
            mt="2" px="2" py="4"
            _dark={{ bg: "blueGray.800", borderColor: 'blueGray.500', borderWidth: 0.6 }}
            _light={{ bg: "white" }}
            borderRadius="md"
            alignSelf="center"
         >
            <HStack space={8} alignItems="center" >
               <Text fontSize="lg">{colorMode == "light" ? "Light Mode" : "Dark Mode"}</Text>
               <Switch
                  name="light Mode"
                  isChecked={colorMode === "light"}
                  onToggle={onToggleColorMode}
                  accessibilityLabel="display-mode"
                  accessibilityHint="light or dark mode"
               />
            </HStack>
         </Center>
      </Box>

   );
};

export default DisplaySettingScreen;
