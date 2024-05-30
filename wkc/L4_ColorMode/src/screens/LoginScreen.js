import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Button,
  ButtonText,
  HStack,
  Center,
  Pressable,
} from "@gluestack-ui/themed";
import { useState } from "react";
import ColorModeBtn from "../components/ColorModeBtn";
import { useDispatch } from "react-redux";
import { gotoSignUp, setLogin } from "../redux/accountSlice";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Center
      w="100%"
      flex={1}
      sx={{
        _dark: {
          bg: "$light900",
        },
        _light: {
          bg: "$light200",
        },
      }}
    >
      <Box
        style={{
          position: "absolute",
          top: 50,
          left: "80%",
        }}
      >
        <ColorModeBtn size={30} />
      </Box>
      <Box
        sx={{
          _dark: {
            bg: "$light900",
          },
          _light: {
            bg: "$light200",
          },
        }}
        safeArea
        p="$2"
        py="$8"
        w="$90%"
        maxW="$290"
      >
        <Heading size="3xl" bold textAlign="center">
          SIGN IN
        </Heading>

        <VStack space={3} mt="$10">
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Email ID</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="email"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
            </Input>
          </FormControl>
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="password"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </Input>
          </FormControl>
          <Button mt="$2" onPress={() => dispatch(setLogin())}>
            <ButtonText>Sign in</ButtonText>
          </Button>
          <HStack mt="$6" justifyContent="center">
            <Text size="$sm">I'm a new user. </Text>
            <Pressable
              onPress={() => {
                dispatch(gotoSignUp());
              }}
            >
              <Text underline="true" fontWeight="medium" size="$sm">
                Sign up
              </Text>
            </Pressable>
          </HStack>
          <Text
            mt="$5"
            fontWeight="medium"
            size="$xs"
            textAlign="center"
            sx={{
              _dark: {
                color: "pink",
              },
              _light: {
                color: "darkred",
              },
            }}
          >
            {""}
          </Text>
        </VStack>
      </Box>
    </Center>
  );
};

export default LoginScreen;