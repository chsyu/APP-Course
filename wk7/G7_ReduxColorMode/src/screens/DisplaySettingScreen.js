import React from "react";
import { Center, Box } from "@gluestack-ui/themed";
import { useSelector } from "react-redux";
import { selectColorMode } from "../redux/settingsSlice";
import ColorModeSwitch from "../components/ColorModeSwitch";

const DisplaySettingScreen = () => {
  const colorMode = useSelector(selectColorMode);
  return (
   <Box
      flex={1}
      bg={colorMode == "light" ? "#ededed" : "#000"}
   >
      <Center
         shadow={2}
         width="90%"
         mt="$2"
         px="$2"
         py="$4"
         bg={colorMode == "light" ? "white" : "#2d2d2d"}
         borderRadius={3}
         borderColor={colorMode == "light" ? "lightgray" : "gray"}
         borderWidth={colorMode == "light" ? 0 : 1}
         alignSelf="center"
      >
         <ColorModeSwitch />
      </Center>
   </Box>

  );
};

export default DisplaySettingScreen;
