import React from "react";
import { Center, Button, ButtonText, Box } from "@gluestack-ui/themed";
import ListItem from "../components/ListItem";
import { useDispatch } from "react-redux";
import { logout } from "../redux/accountSlice"

const SettingsScreen = () => {
  const dispatch = useDispatch();
  return (
    <Box mt="$1" borderBottomWidth="$1" borderColor="lightgray">
      <ListItem title="Display" destination="DisplaySetting" />
      <ListItem title="Account" destination="AccountSetting" />
      <Center>
        <Button w="90%" mt="$10" size="lg" action="secondary"
          onPress={() => {
            dispatch(logout());
          }}  
        >
          <ButtonText>Logout</ButtonText>
        </Button>        
      </Center>

    </Box>
  );
};

export default SettingsScreen;
