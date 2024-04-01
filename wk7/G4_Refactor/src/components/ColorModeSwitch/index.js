import { HStack, Text, Switch } from "@gluestack-ui/themed";
import { useDispatch, useSelector } from "react-redux";
import { selectColorMode } from "../../redux/counterSlice";
import { toggleColorMode } from "../../redux/counterSlice";

const ColorModeSwitch = () => {
  // Get states from store
  const colorMode = useSelector(selectColorMode);

  // Define a dispatch to send actions
  const dispatch = useDispatch();

  return (
    <HStack mt="$10" space={8} alignItems="center">
      <Text size="lg" px="$2" color={colorMode == "dark" ? "white" : "black"}>
        {colorMode == "light" ? "Light Mode" : "Dark Mode"}
      </Text>
      <Switch
        name="light Mode"
        value={colorMode === "light"}
        onToggle={() => dispatch(toggleColorMode())}
        accessibilityLabel="display-mode"
        accessibilityHint="light or dark mode"
      />
    </HStack>
  );
};

export default ColorModeSwitch;
