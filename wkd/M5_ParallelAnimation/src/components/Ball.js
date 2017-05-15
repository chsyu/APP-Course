import React, { Component } from 'react';
import {
  View,
  Animated,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';

const { width, height } = Dimensions.get('window');
// const ballWidth = 60;

class Ball extends Component {
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY(0, 0);
    const ballWidth = new Animated.Value(60);
    const ballRadius = new Animated.Value(30);
    this.state = { touched: false, position, ballWidth, ballRadius };
  }

  startAnimation() {
    if (!this.state.touched) {
      this.setState({ touched: true });
      Animated.parallel([
        Animated.spring(this.state.ballWidth, {
          toValue: 120
        }),
        Animated.spring(this.state.ballRadius, {
          toValue: 60
        }),
        Animated.spring(this.state.position, {
          toValue: { x: width-120, y: height-120 }
        })
      ]).start(()=>this.startAnimation());

    } else {
      this.setState({ touched: false });
      Animated.parallel([
        Animated.spring(this.state.ballWidth, {
          toValue: 60
        }),
        Animated.spring(this.state.ballRadius, {
          toValue: 30
        }),
        Animated.spring(this.state.position, {
          toValue: { x: 0, y: 0 }
        })
      ]).start(()=>this.startAnimation());
    }
  }

  render() {
    const { ballWidth, ballRadius } = this.state;
    return (
      <TouchableWithoutFeedback
        onPress={() => this.startAnimation()}
      >
        <Animated.View
          style={[
            this.state.position.getLayout(),
            {
              height: ballWidth,
              width: ballWidth,
              borderRadius: ballRadius,
              backgroundColor: 'red'
            }
          ]}
        />
      </TouchableWithoutFeedback>
    );
  }
}


export default Ball;
