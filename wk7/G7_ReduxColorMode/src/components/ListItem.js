import React from 'react';
import { Text, HStack, Pressable } from '@gluestack-ui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectColorMode } from '../redux/settingsSlice';

const ListItem = ({ title, destination }) => {
  const { navigate } = useNavigation();
  const colorMode = useSelector(selectColorMode);
   return (
     <Pressable
       onPress={() => {
         destination ? navigate(destination) : null;
       }}
     >
       <HStack
         bg={colorMode == "light" ? "#ededed" : "#2d2d2d"}
         px="$4"
         py="$3"
         borderTopWidth={1}
         borderColor={colorMode == "light" ? "lightgray" : "gray"}
         justifyContent="space-between"
       >
         <Text size={16}
          color={colorMode == "light" ? "black" : "white"}
         >{title}</Text>
         <AntDesign name="right" color={colorMode == "light" ? "gray" : "white"}
          size={16} />
       </HStack>
     </Pressable>
   );
}

export default ListItem;