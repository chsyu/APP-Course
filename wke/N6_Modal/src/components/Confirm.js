import React from "react";
import { View, Modal, StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";

const Confirm = ({ title, visible, onAccept, onDecline }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={styles.containerStyle}>
        <Card title={title}>
          <View style={{ flexDirection: "row" }}>
            <Button
              title="Yes"
              buttonStyle={{ backgroundColor: "#7BD500", width: 100,}}
              containerStyle={{marginRight: 30}}
              onPress={onAccept}
            />
            <Button
              title="No"
              buttonStyle={{ backgroundColor: "#D10036", width: 100, }}
              onPress={onDecline}
            />
          </View>
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    position: "relative",
    flex: 1,
    justifyContent: "center",
  },
});

export default Confirm;
