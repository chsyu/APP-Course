import React from 'react';
import { View } from 'react-native';
import { Text } from "@gluestack-ui/themed";

const SettingsScreen = () => {
    return (
    <View style={{flex: 1}}>
        <Text fontSize={30}>
            This is a Setting Page
        </Text>              
    </View>
    );
}

export default SettingsScreen;