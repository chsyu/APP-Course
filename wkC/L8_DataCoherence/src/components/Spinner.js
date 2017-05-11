import React from 'react';
import { Text, View, Modal, ActivityIndicator } from 'react-native';
import { Card, Button } from 'react-native-elements';

const Spinner = ({ visible }) => {

   return (
      <Modal
         visible={visible}
         transparent
         animationType="slide"
         onRequestClose={() => { }}
      >
         <View style={styles.containerStyle}>
            <ActivityIndicator
               size='large'
            />
         </View>
      </Modal>
   );
};

const styles = {
   containerStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      position: 'relative',
      flex: 1,
      justifyContent: 'center'
   }
};

export default Spinner;
