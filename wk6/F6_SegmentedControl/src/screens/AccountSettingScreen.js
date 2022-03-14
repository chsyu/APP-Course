import React, { useState } from 'react';
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Box, Text, Center, useColorMode } from "native-base";


export default function TabVAccountSettingScreeniewExample() {
   const [selectedIndex, setSelectedIndex] = useState(0);
   const { colorMode } = useColorMode();

   const SegmentedContent = () => {
      if (selectedIndex == 1) {
         return (
            <Center flex={1}
               _dark={{ bg: "blueGray.900" }}
               _light={{ bg: "blueGray.50" }}>
               <Text>This is an Advanced Account Setting Page</Text>
            </Center>
         )
      } else {
         return (
            <Center flex={1}
               _dark={{ bg: "blueGray.900" }}
               _light={{ bg: "blueGray.50" }}>
               <Text>This is a General Account Setting Page</Text>
            </Center>
         )
      }
   }

   return (
      <Box flex={1}
         _dark={{ bg: "blueGray.900" }}
         _light={{ bg: "blueGray.50" }}>
         <SegmentedControlTab
            values={["General", "Advanced"]}
            tabStyle={{ 
               marginTop: 10, borderColor: colorMode == "light" ? "gray" : "black", 
               borderWidth: colorMode=="light"? 1: 4,
               backgroundColor: colorMode == "light" ? "white" : "black" 
            }}
            firstTabStyle={{ marginLeft: 20 }}
            lastTabStyle={{ marginRight: 20 }}
            tabTextStyle={{ fontSize: 16, padding: 5, color: colorMode == "light" ? "gray" : "#88898B", }}
            activeTabStyle={{ backgroundColor: colorMode == "light" ? "gray" : "#282A2E" }}
            activeTabTextStyle={{ color: "white" }}
            selectedIndex={selectedIndex}
            onTabPress={(index) => setSelectedIndex(index)}
         />
         <SegmentedContent />
      </Box>
   );
}