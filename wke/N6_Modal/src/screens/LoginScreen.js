import React, { useState } from "react";
import * as firebase from "firebase";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Button, Text } from "react-native-elements";
import Input from "../components/Input";
import Confirm from "../components/Confirm";

// Make a component
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onSignIn = async () => {
    setError(" ");
    setLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.navigate("User");
    } catch (err) {
      setShowModal(true);
      setLoading(false);
    }
  };

  const onCreateUser = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      setShowModal(false);
      setError("");
      setEmail("");
      setPassword("");
      setLoading(false);
      navigation.navigate("User");
    } catch (err) {
      setShowModal(false);
      setError(err.message);
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  const onCLoseModal = () => {
      setShowModal(false);
      setError("");
      setEmail("");
      setPassword("");
      setLoading(false);
  };


  const renderButton = () => {
   if (loading) {
      return <ActivityIndicator size="large" style={{ marginTop: 30 }} />;
   }

   return (
     <Button
       title="Sign in"
       buttonStyle={{ backgroundColor: "#4AAF4C" }}
       containerStyle={{ padding: 5 }}
       onPress={onSignIn}
     />
   );
  };
  return (
    <View>
      <View style={styles.formStyle}>
        <Input
          labelStyle={{ marginTop: 20 }}
          label="Email"
          placeholder="ntue@dtd.com"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <Input
          labelStyle={{ marginTop: 20 }}
          label="Password"
          placeholder="Must have at least 7 characters"
          secureTextEntry
          autoCorrect={false}
          autoCapitalize="none"
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
        {renderButton()}
        <Text style={{ padding: 10, fontSize: 16, color: "red" }}>{error}</Text>
      </View>
      <View style={styles.formStyle}>
        <Button
          title="Sign in with Facebook"
          buttonStyle={{ backgroundColor: "#39579A" }}
          containerStyle={{ padding: 5 }}
        />
      </View>
      <Confirm
        title="Are you sure to create a new user?"
        visible={showModal}
        onAccept={onCreateUser}
        onDecline={onCLoseModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formStyle: {
    marginTop: 150,
  },
});

export default LoginScreen;
