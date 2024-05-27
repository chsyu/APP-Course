import React, { useState } from 'react';
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Box } from "@gluestack-ui/themed";
import GeneralAccountScreen from './GeneralAccountScreen';
import AdvancedAccountScreen from './AdvancedAccountScreen';

export default function TabAccountSettingScreeniewExample() {
   const [selectedIndex, setSelectedIndex] = useState(0);

   const SegmentedContent = () => {
      return (
         selectedIndex == 0 ?
         <GeneralAccountScreen /> :
         <AdvancedAccountScreen />
      );
   }

   return (
      <Box flex={1} >
         <SegmentedControlTab
            values={["General", "Advanced"]}
            tabStyle={{ 
               backgroundColor: "white",
               marginTop: 10,
               borderColor: "gray",
            }}
            activeTabStyle={{
               backgroundColor: "gray",
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