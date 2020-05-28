import React, { useState, useRef } from 'react';
import {
   View,
   LayoutAnimation,
   ActivityIndicator,
   Platform,
   UIManager
} from 'react-native';

import { Button } from 'react-native-elements';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

const SpinnerBtn = ({ title, backgroundColor, onPress }) => {
    const [loading, setLoading] = useState(false);
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);

    const onPressBtn = () => {
      LayoutAnimation.easeInEaseOut();
      setWidth(width === null ? 60 : null);
      setHeight(height === null ? 60 : null);
      setLoading(loading === false ? true : false);
      onPress();
   }

    const renderButton = () => {
        console.log(`button width = ${width}, button height = ${height}`);
        return (
            <View style={loading ? styles.containerStyle : null}>
            <Button
                title={loading ? "  " : title}
                backgroundColor={backgroundColor}
                onPress={() => onPressBtn()}
                buttonStyle={[{ borderRadius: loading ? 30 : null }, { width, height }]}
            />
            </View>
        );
    }

    const renderActivityIndicator = () => {
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

    return (
        <View style={styles.formStyle}>
        {renderButton()}
        {renderActivityIndicator()}
        </View>
    );
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
