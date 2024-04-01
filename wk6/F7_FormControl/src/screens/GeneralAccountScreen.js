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
} from "@gluestack-ui/themed";

const GeneralAccountScreen = () => {
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
          <InputField placeholder="Input your name" />
        </Input>
      </FormControl>
      <FormControl mb={5} isRequired>
        <FormControlLabel>
          <FormControlLabelText>Email</FormControlLabelText>
        </FormControlLabel>
        <Input variant="underlined">
          <InputField placeholder="Input your Email" />
        </Input>
      </FormControl>
      <FormControl mb={5}>
        <FormControlLabel>
          <FormControlLabelText>Address</FormControlLabelText>
        </FormControlLabel>
        <Input variant="underlined">
          <InputField placeholder="Input your Address" />
        </Input>
      </FormControl>
      <FormControl mb={5}>
        <FormControlLabel>
          <FormControlLabelText>Tel</FormControlLabelText>
        </FormControlLabel>
        <Input variant="underlined">
          <InputField placeholder="Input your Telephone" />
        </Input>
      </FormControl>
    </VStack>
  );
};

export default GeneralAccountScreen;
