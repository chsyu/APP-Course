import {
  GluestackUIProvider,
  Center,
  HStack,
  Button,
  ButtonText,
  Text,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { useDispatch, useSelector } from "react-redux";
import { selectCounter, selectColorMode } from "../../redux/counterSlice";
import { increaseCounter, decreaseCounter } from "../../redux/counterSlice";
import ColorModeSwitch from "../../components/ColorModeSwitch";

const HomeScreen = () => {
  // Get states from store
  const counterValue = useSelector(selectCounter);
  const colorMode = useSelector(selectColorMode);

  // Define a dispatch to send actions
  const dispatch = useDispatch();

  return (
    <GluestackUIProvider config={config}>
      <Center flex={1} bg={colorMode == "light" ? "white" : "black"}>
        <HStack space="3xl">
          <Button
            borderRadius={0}
            $xl-p={10}
            height={50}
            onPress={() => dispatch(increaseCounter())}
          >
            <ButtonText size="2xl" color="white">
              +
            </ButtonText>
          </Button>
          <Button
            borderRadius={0}
            $xl-p={10}
            height={50}
            onPress={() => dispatch(decreaseCounter())}
          >
            <ButtonText size="2xl" color="white">
              -
            </ButtonText>
          </Button>
        </HStack>
        <Text
          size="3xl"
          mt="$10"
          color={colorMode == "dark" ? "white" : "black"}
        >
          {counterValue}
        </Text>
        <ColorModeSwitch />
      </Center>
    </GluestackUIProvider>
  );
};

export default HomeScreen;
