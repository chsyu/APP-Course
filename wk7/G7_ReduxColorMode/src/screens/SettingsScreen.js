import React from "react";
import { Box } from "@gluestack-ui/themed";
import ListItem from "../components/ListItem";
import { useSelector } from "react-redux";
import { selectColorMode } from "../redux/settingsSlice";

const SettingsScreen = () => {
  const colorMode = useSelector(selectColorMode);
  return (
    <Box flex={1} mt="$1" borderBottomWidth="$1" borderColor="lightgray"
    bg={colorMode == "light" ? "#ededed" : "#000"}
    >
      <ListItem title="Display" destination="DisplaySetting" />
      <ListItem title="Account" destination="AccountSetting" />
    </Box>
  );
};

export default SettingsScreen;
