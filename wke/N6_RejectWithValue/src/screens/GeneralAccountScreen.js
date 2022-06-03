import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, FormControl, useColorMode, VStack, Text, Input, Button } from 'native-base'

import { selectGeneral, readUserAsync, updateUserAsync } from "../redux/accountSlice";

const GeneralAccountScreen = () => {
   const general = useSelector(selectGeneral);
   const [name, setName] = useState();
   const [email, setEmail] = useState();
   const [adrs, setAdrs] = useState();
   const [tel, setTel] = useState();

   const dispatch = useDispatch();

   const { colorMode } = useColorMode();
   const formLabelStyle = {
      color: colorMode == "light" ? "muted.700" : "white",
      fontSize: "xs",
      fontWeight: 600
   };
   const focusInputStyle = {
      borderColor: colorMode == "light" ? "muted.700" : "white",
   }

   const onUpdate = () => {
      dispatch(updateUserAsync({ name, email, adrs, tel }));
   }

   useEffect(() => {
      dispatch(readUserAsync());
   }, [])

   useEffect(() => {
      setName(general.name)
      setEmail(general.email)
      setAdrs(general.adrs)
      setTel(general.tel)
   }, [general]);

   return (
      <ScrollView>
         <VStack space={2} mt={5} width="80%" alignSelf="center">
            <Text textAlign="center" fontSize="2xl" pb="4">
               GENERAL ACCOUNT
            </Text>
            <FormControl mb={5}>
               <FormControl.Label _text={formLabelStyle}>
                  Name
               </FormControl.Label>
               <Input
                  variant="underlined" _focus={focusInputStyle} value={name}
                  onChangeText={text => setName(text)}
               />
            </FormControl>
            <FormControl mb={5}>
               <FormControl.Label _text={formLabelStyle}>
                  Backup Email
               </FormControl.Label>
               <Input
                  variant="underlined" _focus={focusInputStyle} value={email}
                  onChangeText={text => setEmail(text)}
               />
            </FormControl>
            <FormControl mb={5}>
               <FormControl.Label _text={formLabelStyle}>
                  Address
               </FormControl.Label>
               <Input
                  variant="underlined" _focus={focusInputStyle}
                  value={adrs} onChangeText={text => setAdrs(text)}
               />
            </FormControl>
            <FormControl mb={5}>
               <FormControl.Label _text={formLabelStyle}>
                  Tel
               </FormControl.Label>
               <Input
                  variant="underlined" _focus={focusInputStyle}
                  value={tel} onChangeText={text => setTel(text)}
               />
            </FormControl>
            <Button mt="12" h="10" w="100%" mx="auto" colorScheme="indigo"
               borderRadius={null}
               onPress={onUpdate}
            >
               Update
            </Button>
         </VStack>
      </ScrollView>

   );
}

export default GeneralAccountScreen;