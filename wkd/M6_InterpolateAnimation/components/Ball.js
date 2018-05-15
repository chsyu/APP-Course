import React, { Component } from 'react';
import {
  View,
  Animated,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';

const { width, height } = Dimensions.get('window');

class Ball extends Component {
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY(0, 0);
    const ballWidth = new Animated.Value(60);
    this.state = { touched: false, position, ballWidth };
  }

  startAnimation() {
    if (!this.state.touched) {
      this.setState({ touched: true });
      Animated.parallel([
        Animated.spring(this.state.ballWidth, {
          toValue: 120
        }),
        Animated.spring(this.state.position, {
          toValue: { x: width - 60, y: height - 60 }
        })
      ]).start(() => this.startAnimation());

    } else {
      this.setState({ touched: false });
      Animated.parallel([
        Animated.spring(this.state.ballWidth, {
          toValue: 60
        }),
        Animated.spring(this.state.position, {
          toValue: { x: 0, y: 0 }
        })
      ]).start(() => this.startAnimation());
    }
  }

  render() {
    const { ballWidth } = this.state;
    const diameter = ballWidth.interpolate({
      inputRange: [60, 90, 120],
      outputRange: [60, 120, 60]
    });
    const radius = ballWidth.interpolate({
      inputRange: [60, 90, 120],
      outputRange: [30, 60, 30]
    });

    return (
      <TouchableWithoutFeedback
        onPress={() => this.startAnimation()}
      >
        <Animated.View
          style={[
            this.state.position.getLayout(),
            {
              height: diameter,
              width: diameter,
              borderRadius: radius,
              backgroundColor: 'red'
            }
          ]}
        />
      </TouchableWithoutFeedback>
    );
  }
}


export default Ball;
