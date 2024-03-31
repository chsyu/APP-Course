import React, { useState } from 'react';
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Box } from "@gluestack-ui/themed";
import { useSelector } from 'react-redux';
import GeneralAccountScreen from './GeneralAccountScreen';
import AdvancedAccountScreen from './AdvancedAccountScreen';
import { selectColorMode } from '../redux/settingsSlice';

export default function TabAccountSettingScreeniewExample() {
   const [selectedIndex, setSelectedIndex] = useState(0);
   const colorMode = useSelector(selectColorMode);
   const SegmentedContent = () => {
      return (
         selectedIndex == 0 ?
         <GeneralAccountScreen /> :
         <AdvancedAccountScreen />
      );
   }

   return (
      <Box flex={1} 
      bg={colorMode == "light" ? "black" : "black"}
      >
         <SegmentedControlTab
            values={["General", "Advanced"]}
            tabStyle={{ 
               backgroundColor: colorMode == "light" ? "white" : "#2d2d2d",
               marginTop: 10,
               borderColor: "gray",
            }}
            activeTabStyle={{
               backgroundColor: colorMode == "light" ? "gray" : "#666",
               marginTop: 10,    
               borderColor: "gray",       
            }}
            firstTabStyle={{ marginLeft: 20 }}
            lastTabStyle={{ marginRight: 20 }}

            tabTextStyle={{ fontSize: 16, padding: 5, color: "gray"}}
            activeTabTextStyle={{ color: "white" }}
            selectedIndex={selectedIndex}
            onTabPress={(index) => setSelectedIndex(index)}
         />
         <SegmentedContent />
      </Box>
   );
}