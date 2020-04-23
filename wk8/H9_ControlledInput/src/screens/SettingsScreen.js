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
        value={me.email}
        onChangeText={(email) => setMe({ ...me, email })}
      />
      <Input
        labelStyle={{ marginTop: 20 }}
        label="Phone"
        placeholder="1234-567890"
        value={me.phone}
        onChangeText={(phone) => setMe({ ...me, phone })}
      />
      <Input
        labelStyle={{ marginTop: 20 }}
        label="Username"
        placeholder="John Doe"
        value={me.login.username}
        onChangeText={(username) =>
          setMe({ ...me, login: { ...me.login, username } })
        }
      />
      <Input
        labelStyle={{ marginTop: 20 }}
        label="Birthday"
        placeholder="1900-01-01"
        value={me.dob}
        onChangeText={(dob) => setMe({ ...me, dob })}
      />
      <Input
        labelStyle={{ marginTop: 20 }}
        label="City"
        placeholder="Taipei"
        value={me.location.city}
        onChangeText={(city) =>
          setMe({ ...me, location: { ...me.location, city } })
        }
      />
    </ScrollView>
  );
};

export default SettingsScreen;
