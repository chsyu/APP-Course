import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import * as firebase from "firebase";
import { Button } from "react-native-elements";
import { StoreContext } from "../stores";

// Make a component
const UserScreen = ({ navigation }) => {
  const { isLoginState } = useContext(StoreContext);
  const [isLogin, setIsLogin] = isLoginState;
  const onSignOut = () => {
    firebase.auth().signOut();
    setIsLogin(false);
  };

  return (
    <View style={styles.formStyle}>
      <Button
        title="Sign out"
        buttonStyle={{ backgroundColor: "#F8671D" }}
        containerStyle={{ padding: 5 }}
        onPress={onSignOut}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formStyle: {
    marginTop: 250,
  },
});

export default UserScreen;
