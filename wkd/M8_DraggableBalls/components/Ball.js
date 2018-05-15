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
      const { x, y } = props.positionXY;
      position.setValue({ x, y });
      const panResponder = PanResponder.create({
         onStartShouldSetPanResponder: () => true,
         onPanResponderMove: (event, gesture) => {
            let { moveX, moveY } = gesture;
            position.setValue({ x: moveX-ballWidth/2, 
                                y: moveY-ballWidth/2 });
         },
         onPanResponderRelease: (event, gesture) => { }
      });

      this.state = { panResponder, position };
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
