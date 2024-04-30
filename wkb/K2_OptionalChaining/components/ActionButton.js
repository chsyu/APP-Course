import React from "react";
import {
  Center,
  Pressable,
  Actionsheet,
} from "@gluestack-ui/themed";
import Icon from "react-native-vector-icons/FontAwesome";
import ActionScreen from "../screens/ActionScreen";

export default (props) => {
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);  
  const { zoomRatio, site } = props;

  return (
    <>
      <Pressable onPress={handleClose}>
        <Center
          bg="white"
          borderRadius={60}
          p={3 * zoomRatio}
          borderWidth={2 * zoomRatio}
          borderColor="black"
        >
          <Icon name={"bicycle"} size={30 * zoomRatio} color="black" />
        </Center>
      </Pressable>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionScreen handleClose={handleClose} site={site} />
      </Actionsheet>
    </>
  );
};
