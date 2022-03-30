import React, { useState } from 'react';
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Box, useColorMode } from "native-base";

import GeneralAccountScreen from './GeneralAccountScreen';
import AdvancedAccountScreen from './AdvancedAccountScreen';


export default function TabVAccountSettingScreeniewExample() {
   const [selectedIndex, setSelectedIndex] = useState(0);
   const { colorMode } = useColorMode();

   const SegmentedContent = () => {
      return (
         selectedIndex == 0 ?
         <GeneralAccountScreen /> :
         <AdvancedAccountScreen />
      );
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