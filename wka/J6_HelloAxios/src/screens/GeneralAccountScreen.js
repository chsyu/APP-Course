import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, FormControl, useColorMode, VStack, Text, Input, WarningOutlineIcon, KeyboardAvoidingView } from 'native-base'

import { setGeneralAccountInfo } from "../redux/accountSlice";
import { selectGeneral } from "../redux/accountSlice";

const GeneralAccountScreen = () => {
   const general = useSelector(selectGeneral);

   const [name, setName] = useState(general.name);
   const [nameIsError, setNameIsError] = useState(true);
   const [email, setEmail] = useState(general.email);
   const [emailIsError, setEmailIsError] = useState(true);
   const [adrs, setAdrs] = useState(general.adrs);
   const [tel, setTel] = useState(general.tel);

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

   const nameRegex = /^[a-zA-Z]+\w*$/;
   const emailRegex = /\w{3,}@[a-zA-Z_]+\.[a-zA-Z]{2,5}/

   useEffect(() => {
      if (!nameIsError && !emailIsError)
         dispatch(setGeneralAccountInfo({ name, email, adrs, tel }))

      if (email.match(emailRegex)) setEmailIsError(false)
      else setEmailIsError(true);

      if (name.match(nameRegex)) setNameIsError(false)
      else setNameIsError(true);
   }, [name, email, adrs, tel]);

   return (
      <ScrollView>
         <VStack space={2} mt={5} width="80%" alignSelf="center">
            <Text textAlign="center" fontSize="2xl" pb="4">
               GENERAL SETTINGS
            </Text>
            <FormControl mb={5} isRequired isInvalid={nameIsError}>
               <FormControl.Label _text={formLabelStyle}>
                  Name
               </FormControl.Label>
               <Input
                  variant="underlined" _focus={focusInputStyle} value={name}
                  onChangeText={text => setName(text)}
               />
               <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                  You must enter a valid name.
               </FormControl.ErrorMessage>
            </FormControl>
            <FormControl mb={5} isRequired isInvalid={emailIsError}>
               <FormControl.Label _text={formLabelStyle}>
                  Email
               </FormControl.Label>
               <Input
                  variant="underlined" _focus={focusInputStyle} value={email}
                  onChangeText={text => setEmail(text)}
               />
               <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                  You must enter a valid email.
               </FormControl.ErrorMessage>
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
         </VStack>
      </ScrollView>

   );
}

export default GeneralAccountScreen;