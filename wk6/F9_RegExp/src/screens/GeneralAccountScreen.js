import { useState } from "react";
import { FormControl, useColorMode, VStack, Text, Input, WarningOutlineIcon } from 'native-base'

const GeneralAccountScreen = () => {
   const [name, setName] = useState("");
   const [nameIsError, setNameIsError] = useState(true);
   const [email, setEmail] = useState("");
   const [emailIsError, setEmailIsError] = useState(true);
   const [adrs, setAdrs] = useState("");
   const [tel, setTel] = useState("");

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
   const emailRegex =/^\w{3,}@[a-zA-Z_]+?\.[a-zA-Z]{2,5}/

   return (
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
               onChangeText={text => {
                  setName(text);
                  if (text.match(nameRegex)) {
                     setNameIsError(false);
                   } else setNameIsError(true);
               }}
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
               onChangeText={text => {
                  setEmail(text);
                  if (text.match(emailRegex)) {
                     setEmailIsError(false);
                   } else setEmailIsError(true);
               }}
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
   );
}

export default GeneralAccountScreen;