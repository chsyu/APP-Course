import React, { Component } from 'react';
import {
   View,
   Animated,
   Dimensions,
   PanResponder
} from 'react-native';

const { width, height } = Dimensions.get('window');
const ballWidth = 60;

class Ball extends Component {
   constructor(props) {
      super(props);
      const position = new Animated.ValueXY();
      this.state = { position };
      const panResponder = PanResponder.create({
         onStartShouldSetPanResponder: () => true,
         onPanResponderMove: Animated.event(
            [null, // ignore the native event
            { dx: this.state.position.x }]
         ),
         onPanResponderRelease: (event, gesture) => { }
      });

      this.state = { ...this.state, panResponder };
   }

   render() {
      return (
         <Animated.View
            style={this.state.position.getLayout()}
            {...this.state.panResponder.panHandlers}
         >
            <View
               style={styles.ball}
            />
         </Animated.View>
      );
   }
}

const styles = {
   ball: {
      position: 'absolute',
      height: ballWidth,
      width: ballWidth,
      borderRadius: ballWidth / 2,
      backgroundColor: 'red'
   }
};

export default Ball;
