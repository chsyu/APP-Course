import React from "react";
import { Box, Center, Button } from "native-base";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/accountActions"
import ListItem from "../components/ListItem"

const SettingsScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    return (
        <Box
            flex={1}
            _dark={{ bg: "blueGray.900" }}
            _light={{ bg: "blueGray.50" }}
        >
            <Box
                mt="1" borderBottomWidth={1} borderColor="lightgray"
                _dark={{ borderColor: 'blueGray.500', borderButtomWidth: 0.6 }}
            >
                <ListItem title="Display" navigation={navigation} destination="DisplaySetting" />
                <ListItem title="Account" navigation={navigation} destination="AccountSetting" />
            </Box>
            <Center>
                <Button mt={40} colorScheme="indigo" w="90%"
                    onPress={() => dispatch(logout())}
                >
                    Sign out
                </Button>
            </Center>
        </Box>

    );
};

export default SettingsScreen;
