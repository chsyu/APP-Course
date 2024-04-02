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
  Link,
  LinkText,
  Button,
  ButtonText,
  HStack,
  Center,
} from "@gluestack-ui/themed";
import { useDispatch } from "react-redux";
import { login } from "../redux/accountSlice";

const LoginScreen = () => {
  const dispatch = useDispatch();

  return (
    <Center
      w="100%"
      flex={1}
      _dark={{ bg: "blueGray900" }}
      _light={{ bg: "white" }}
    >
      <Box safeArea p="$2" py="$8" w="$90%" maxW="$290">
        <Heading
          size="3xl"
          bold
          color="$coolGray800"
          _dark={{
            color: "$warmGray50",
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt="$1"
          _dark={{
            color: "$warmGray200",
          }}
          color="$coolGray600"
          fontWeight="medium"
          size="$xs"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="$5">
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Email ID</FormControlLabelText>
            </FormControlLabel>
            <Input>
               <InputField type="email" />
            </Input>
          </FormControl>
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input>
               <InputField type="password" />
            </Input>
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "$indigo500",
              }}
              alignSelf="flex-end"
              mt="$10"
            >
              <LinkText>Forget Password?</LinkText>
            </Link>
          </FormControl>
          <Button
            mt="$2"
            colorScheme="indigo"
            onPress={() => dispatch(login())}
          >
            <ButtonText>Sign in</ButtonText>
          </Button>
          <HStack mt="$6" justifyContent="center">
            <Text
              size="$sm"
              color="$coolGray600"
              _dark={{
                color: "$warmGray200",
              }}
            >
              I'm a new user.{" "}
            </Text>
            <Link
              _text={{
                color: "$indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              href="#"
            >
              <LinkText>Sign Up</LinkText>
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default LoginScreen;
