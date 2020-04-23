import React, { useContext } from "react";
import { ScrollView, Text } from "react-native";
import { Input } from "react-native-elements";
import { StoreContext } from "../stores/AlbumStore";

// Make a component
const SettingsScreen = ({ navigation }) => {
  const { meState } = useContext(StoreContext);
  let [me, setMe] = meState;
  return (
    <ScrollView style={{ paddingTop: 44 }}>
      <Text style={{ fontSize: 30, textAlign: "center" }}>
        User Info Setting
      </Text>
      <Input
        labelStyle={{ marginTop: 20 }}
        label="Email"
        placeholder="ntue@dtd.com"
      />
      <Input
        labelStyle={{ marginTop: 20 }}
        label="Phone"
        placeholder="1234-567890"
      />
      <Input
        labelStyle={{ marginTop: 20 }}
        label="Username"
        placeholder="John Doe"
      />
      <Input
        labelStyle={{ marginTop: 20 }}
        label="Birthday"
        placeholder="1900-01-01"
      />
      <Input
        labelStyle={{ marginTop: 20 }}
        label="City"
        placeholder="Taipei"
      />
    </ScrollView>
  );
};

export default SettingsScreen;
