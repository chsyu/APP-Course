import React from 'react';
import { Text, View, Modal } from 'react-native';
import { Card, Button } from 'react-native-elements';

const Confirm = ({ title, visible, onAccept, onDecline }) => {

   return (
      <Modal
         visible={visible}
         transparent
         animationType="slide"
         onRequestClose={() => { }}
      >
         <View style={styles.containerStyle}>
            <Card title={title}>
               <View style={{ flexDirection: 'row' }}>
                  <Button
                     style={{ flex: 1 }}
                     title='Yes'
                     backgroundColor='#7BD500'
                     onPress={onAccept}
                  />
                  <Button
                     style={{ flex: 1 }}
                     title='No'
                     backgroundColor='#D10036'
                     onPress={onDecline}
                  />
               </View>
            </Card>
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

export default Confirm;
