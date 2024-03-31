import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
  AlertCircleIcon,
  VStack,
  Text,
  Input,
  InputField,
  Box,
  KeyboardAvoidingView,
} from "@gluestack-ui/themed";
import React, { useState, useEffect } from "react";
import { setGeneralAccountInfo } from "../redux/accountSlice";
import { selectGeneral } from "../redux/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectColorMode } from "../redux/settingsSlice";

const GeneralAccountScreen = () => {
  const general = useSelector(selectGeneral);
  const colorMode = useSelector(selectColorMode);

  const dispatch = useDispatch();
  const [name, setName] = useState(general.name);
  const [nameIsError, setNameIsError] = useState(true);
  const [email, setEmail] = useState(general.email);
  const [emailIsError, setEmailIsError] = useState(true);
  const [adrs, setAdrs] = useState(general.adrs);
  const [tel, setTel] = useState(general.tel);

  const nameRegex = /^[a-zA-Z]+\w*$/;
  const emailRegex = /\w{3,}@[a-zA-Z_]+\.[a-zA-Z]{2,5}/;

  useEffect(() => {
    if (!nameIsError && !emailIsError)
      dispatch(setGeneralAccountInfo({ name, email, adrs, tel }));

    if (email.match(emailRegex)) setEmailIsError(false);
    else setEmailIsError(true);

    if (name.match(nameRegex)) setNameIsError(false);
    else setNameIsError(true);
  }, [name, email, adrs, tel]);

  return (
    <Box flex={1} bg={colorMode == "light" ? "#ededed" : "#000"}>
      <VStack
        bg={colorMode == "light" ? "#ededed" : "#000"}
        space={2}
        mt={5}
        width="80%"
        alignSelf="center"
      >
        <Text
          textAlign="center"
          size="2xl"
          pb="$4"
          color={colorMode == "light" ? "black" : "white"}
        >
          GENERAL SETTINGS
        </Text>
        <FormControl mb={5} isRequired>
          <FormControlLabel>
            <FormControlLabelText
              color={colorMode == "light" ? "black" : "#ccc"}
            >
              Name
            </FormControlLabelText>
          </FormControlLabel>
          <Input variant="underlined">
            <InputField
              placeholder="Input your name"
              color={colorMode == "light" ? "black" : "white"}
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (nameRegex.test(text)) setNameIsError(false);
                else setNameIsError(true);
              }}
            />
          </Input>
          <FormControlError isInvalid={nameIsError}>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              You must enter a valid name.
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <FormControl mb={5} isRequired>
          <FormControlLabel>
            <FormControlLabelText
              color={colorMode == "light" ? "black" : "#ccc"}
            >
              Email
            </FormControlLabelText>
          </FormControlLabel>
          <Input variant="underlined">
            <InputField
              placeholder="Input your Email"
              value={email}
              color={colorMode == "light" ? "black" : "white"}
              onChangeText={(text) => {
                setEmail(text);
                if (emailRegex.test(text)) setEmailIsError(false);
                else setEmailIsError(true);
              }}
            />
          </Input>
          <FormControlError isInvalid={emailIsError}>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              Must be the form of abc@example.com.
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <FormControl mb={5}>
          <FormControlLabel>
            <FormControlLabelText
              color={colorMode == "light" ? "black" : "#ccc"}
            >
              Address
            </FormControlLabelText>
          </FormControlLabel>
          <Input variant="underlined">
            <InputField
              placeholder="Input your Address"
              value={adrs}
              color={colorMode == "light" ? "black" : "white"}
              onChangeText={(text) => setAdrs(text)}
            />
          </Input>
        </FormControl>
        <FormControl mb={5}>
          <FormControlLabel>
            <FormControlLabelText
              color={colorMode == "light" ? "black" : "#ccc"}
            >
              Tel
            </FormControlLabelText>
          </FormControlLabel>
          <Input variant="underlined">
            <InputField
              placeholder="Input your Telephone"
              value={tel}
              color={colorMode == "light" ? "black" : "white"}
              onChangeText={(text) => setTel(text)}
            />
          </Input>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default GeneralAccountScreen;
