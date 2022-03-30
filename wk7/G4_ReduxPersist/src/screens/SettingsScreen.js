import React from "react";
import { Box } from "native-base";
import ListItem from "../components/ListItem"

const SettingsScreen = ({ navigation }) => {
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
                <ListItem title="Account" navigation={navigation} destination="AccountSetting"/>
            </Box>            
        </Box>

    );
};

export default SettingsScreen;
