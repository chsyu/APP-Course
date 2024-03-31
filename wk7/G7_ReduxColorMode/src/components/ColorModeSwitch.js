import { HStack, Switch, Text } from '@gluestack-ui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { selectColorMode } from '../redux/settingsSlice';
import { toggleColorMode } from "../redux/settingsSlice";

function ColorModeSwitch() {
   const dispatch = useDispatch();
   const colorMode = useSelector(selectColorMode);

   return (
      <HStack space={8} alignItems="center" 
         bg={
            colorMode == "light" ? "white" : "#2d2d2d"
         }
      >
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
   )
}

export default ColorModeSwitch;