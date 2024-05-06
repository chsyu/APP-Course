import { Appearance, useColorScheme } from "react-native";
import { Pressable } from "@gluestack-ui/themed";
import { Sun, Moon } from "../icons";

const ColorModeBtn = ({size}) => {
  const colorScheme = useColorScheme();

  const toggleColorScheme = () => {
    const nextColorScheme = colorScheme === "light" ? "dark" : "light";
    Appearance.setColorScheme(nextColorScheme);
  };

  return (
    <Pressable onPress={toggleColorScheme}>
      {colorScheme === "light" ? (
        <Sun color="black" size={size} />
      ) : (
        <Moon color="white" size={size} />
      )}
    </Pressable>
  );
};

export default ColorModeBtn;