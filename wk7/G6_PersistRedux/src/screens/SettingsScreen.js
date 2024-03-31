import React from "react";
import { Box } from "@gluestack-ui/themed";
import ListItem from "../components/ListItem";

const SettingsScreen = () => {
  return (
    <Box mt="$1" borderBottomWidth="$1" borderColor="lightgray">
      <ListItem title="Display" destination="DisplaySetting" />
      <ListItem title="Account" destination="AccountSetting" />
    </Box>
  );
};

export default SettingsScreen;
