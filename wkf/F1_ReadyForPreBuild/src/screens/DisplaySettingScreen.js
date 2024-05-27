import React from "react";
import { Appearance, useColorScheme } from "react-native";
import { Box, Center, Switch, HStack, Text } from "@gluestack-ui/themed";

const DisplaySettingScreen = () => {
  const colorScheme = useColorScheme();
  return (
    <Box mt="$1" bg={colorScheme == "light" ? "#eee" : "#000"} height="100%">
      <Center
        shadow={2}
        width="90%"
        mt="$2"
        px="$2"
        py="$4"
        bg={colorScheme == "light" ? "white" : "#444"}
        borderRadius={3}
        alignSelf="center"
      >
        <HStack space={8} alignItems="center">
          <Text size="lg" px="$2">
            {colorScheme == "light" ? "Light Mode" : "Dark Mode"}
          </Text>
          <Switch
            name="light Mode"
            size="md"
            accessibilityLabel="display-mode"
            accessibilityHint="light or dark mode"
            $active-bg="#000"
            onValueChange={() => {
              const nextColorScheme =
                colorScheme === "light" ? "dark" : "light";
              Appearance.setColorScheme(nextColorScheme);
            }}
          />
        </HStack>
      </Center>
    </Box>
  );
};

export default DisplaySettingScreen;
