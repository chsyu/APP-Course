import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
  VStack,
  Text,
  Input,
  InputField,
  KeyboardAvoidingView,
} from "@gluestack-ui/themed";
import React, { useState } from "react";

const GeneralAccountScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [adrs, setAdrs] = useState("");
  const [tel, setTel] = useState("");
  console.log(name, email, adrs, tel);
  return (
    <VStack space={2} mt={5} width="80%" alignSelf="center">
      <Text textAlign="center" size="2xl" pb="$4">
        GENERAL SETTINGS
      </Text>
      <FormControl mb={5} isRequired>
        <FormControlLabel>
          <FormControlLabelText>Name</FormControlLabelText>
        </FormControlLabel>
        <Input variant="underlined">
          <InputField
            placeholder="Input your name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </Input>
      </FormControl>
      <FormControl mb={5} isRequired>
        <FormControlLabel>
          <FormControlLabelText>Email</FormControlLabelText>
        </FormControlLabel>
        <Input variant="underlined">
          <InputField
            placeholder="Input your Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </Input>
      </FormControl>
      <FormControl mb={5}>
        <FormControlLabel>
          <FormControlLabelText>Address</FormControlLabelText>
        </FormControlLabel>
        <Input variant="underlined">
          <InputField
            placeholder="Input your Address"
            value={adrs}
            onChangeText={(text) => setAdrs(text)}
          />
        </Input>
      </FormControl>
      <FormControl mb={5}>
        <FormControlLabel>
          <FormControlLabelText>Tel</FormControlLabelText>
        </FormControlLabel>
        <Input variant="underlined">
          <InputField
            placeholder="Input your Telephone"
            value={tel}
            onChangeText={(text) => setTel(text)}
          />
        </Input>
      </FormControl>
    </VStack>
  );
};

export default GeneralAccountScreen;
