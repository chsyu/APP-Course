import React from 'react';
import { Center, Pressable, Actionsheet, useDisclose } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionScreen from '../screens/ActionScreen';

export default (props) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const { zoomRatio, site } = props;

  return (
    <>
      <Pressable onPress={onOpen}>
        <Center bg="white" borderRadius={60} p={3 * zoomRatio} borderWidth={2 * zoomRatio} borderColor="black">
          <Icon name={"bicycle"} size={30 * zoomRatio} color="black" />
        </Center>
      </Pressable>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <ActionScreen onClose={onClose} site={site} />
      </Actionsheet>
    </>
  );
}
