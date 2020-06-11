import React from 'react';
import { TextInput, View, Text, Platform } from 'react-native';
import { Input } from 'react-native-elements';

const NewInput = (props) => {

   if (Platform.OS === 'ios') {
      return (
         <Input
            {...props}
            autoCorrect={false}
            style={props.style}
         />
      );
   }

   return (
     <View style={styles.containerStyle}>
       <TextInput
         {...props}
         autoCorrect={false}
         style={props.style}
         autoCorrect={false}
       />
     </View>
   );
};

const styles = {
   containerStyle: {
      borderBottomWidth: 1,
      padding: 5,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      borderColor: '#ddd',
   }
};

export default NewInput;
