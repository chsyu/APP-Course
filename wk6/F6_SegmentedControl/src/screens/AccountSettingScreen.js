import React, { useState } from 'react';
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Box, Text, Center } from "@gluestack-ui/themed";


export default function TabAccountSettingScreeniewExample() {
   const [selectedIndex, setSelectedIndex] = useState(0);

   const SegmentedContent = () => {
      if (selectedIndex == 1) {
         return (
            <Center flex={1} >
               <Text>This is an Advanced Account Setting Page</Text>
            </Center>
         )
      } else {
         return (
            <Center flex={1} >
               <Text>This is a General Account Setting Page</Text>
            </Center>
         )
      }
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