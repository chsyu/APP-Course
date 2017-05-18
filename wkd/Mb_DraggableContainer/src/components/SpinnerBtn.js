import React, { Component } from 'react';
import {
   View,
   Text,
   LayoutAnimation,
   TouchableWithoutFeedback,
   ActivityIndicator,
   Dimensions,
   UIManager
} from 'react-native';

import { Button } from 'react-native-elements';
const { width, height } = Dimensions.get('window');

class SpinnerBtn extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: false,
         width: null,
         height: null
      }
   }

   onPressBtn = () => {
      const { onPress } = this.props;
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
      LayoutAnimation.easeInEaseOut();
      this.setState({
         width: this.state.width === null ? 60 : null,
         height: this.state.height === null ? 60 : null,
         loading: this.state.loading === false ? true : false,
      })
      onPress();
   }

   renderButton() {
      const { title, backgroundColor } = this.props;
      const { loading, width, height } = this.state;
      console.log(`button width = ${width}, button height = ${height}`);
      return (
         <View style={loading ? styles.containerStyle : null}>
            <Button
               title={loading ? "  " : title}
               backgroundColor={backgroundColor}
               onPress={() => this.onPressBtn()}
               buttonStyle={[{ borderRadius: loading ? 30 : null }, { width, height }]}
            />
         </View>
      );
   }

   renderActivityIndicator() {
      const { loading } = this.state;
      if (loading) {
         return (
            <ActivityIndicator 
               size='small' 
               color='white' 
               style={{ position: 'absolute', top: 20, left: 0, right: 0}}
            />
         );
      }
   }

   render() {
      return (
         <View style={styles.formStyle}>
            {this.renderButton()}
            {this.renderActivityIndicator()}
         </View>
      );
   }
}

const styles = {
   containerStyle: {
      alignItems: 'center'
   },
   formStyle: {
      flex: 1,
      marginTop: 150
   },
};

export default SpinnerBtn;
