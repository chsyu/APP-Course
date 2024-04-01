import React, { useState } from 'react';
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Box } from "@gluestack-ui/themed";
<<<<<<<< HEAD:wk7/G7_LoginScreen/src/screens/AccountSettingScreen.js
========
import { useSelector } from 'react-redux';
>>>>>>>> refs/remotes/origin/master:wk7/G7_ReduxColorMode/src/screens/AccountSettingScreen.js
import GeneralAccountScreen from './GeneralAccountScreen';
import AdvancedAccountScreen from './AdvancedAccountScreen';
import { selectColorMode } from '../redux/settingsSlice';

export default function TabAccountSettingScreeniewExample() {
   const [selectedIndex, setSelectedIndex] = useState(0);
<<<<<<<< HEAD:wk7/G7_LoginScreen/src/screens/AccountSettingScreen.js

========
   const colorMode = useSelector(selectColorMode);
>>>>>>>> refs/remotes/origin/master:wk7/G7_ReduxColorMode/src/screens/AccountSettingScreen.js
   const SegmentedContent = () => {
      return (
         selectedIndex == 0 ?
         <GeneralAccountScreen /> :
         <AdvancedAccountScreen />
      );
   }

   return (
<<<<<<<< HEAD:wk7/G7_LoginScreen/src/screens/AccountSettingScreen.js
      <Box flex={1} >
         <SegmentedControlTab
            values={["General", "Advanced"]}
            tabStyle={{ 
               backgroundColor: "white",
========
      <Box flex={1} 
      bg={colorMode == "light" ? "black" : "black"}
      >
         <SegmentedControlTab
            values={["General", "Advanced"]}
            tabStyle={{ 
               backgroundColor: colorMode == "light" ? "white" : "#2d2d2d",
>>>>>>>> refs/remotes/origin/master:wk7/G7_ReduxColorMode/src/screens/AccountSettingScreen.js
               marginTop: 10,
               borderColor: "gray",
            }}
            activeTabStyle={{
<<<<<<<< HEAD:wk7/G7_LoginScreen/src/screens/AccountSettingScreen.js
               backgroundColor: "gray",
========
               backgroundColor: colorMode == "light" ? "gray" : "#666",
>>>>>>>> refs/remotes/origin/master:wk7/G7_ReduxColorMode/src/screens/AccountSettingScreen.js
               marginTop: 10,    
               borderColor: "gray",       
            }}
            firstTabStyle={{ marginLeft: 20 }}
            lastTabStyle={{ marginRight: 20 }}
<<<<<<<< HEAD:wk7/G7_LoginScreen/src/screens/AccountSettingScreen.js
========

>>>>>>>> refs/remotes/origin/master:wk7/G7_ReduxColorMode/src/screens/AccountSettingScreen.js
            tabTextStyle={{ fontSize: 16, padding: 5, color: "gray"}}
            activeTabTextStyle={{ color: "white" }}
            selectedIndex={selectedIndex}
            onTabPress={(index) => setSelectedIndex(index)}
         />
         <SegmentedContent />
      </Box>
   );
}