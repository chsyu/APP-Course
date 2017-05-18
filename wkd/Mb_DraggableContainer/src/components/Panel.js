import React, { Component } from 'react';
import {
    View,
    Text,
    LayoutAnimation,
    TouchableWithoutFeedback,
    UIManager,
    Animated,
    Dimensions,
    PanResponder

} from 'react-native';

import { Card } from 'react-native-elements';

class Panel extends Component {
    constructor(props) {
        super(props);
        const position = new Animated.ValueXY();
        this.state = { height: this.props.expanded ? null : 0, position }
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            //onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (event, gesture) => {
                this.state.position.setValue({ x: gesture.dx });
            },
            onPanResponderRelease: this.onReleaseItem,
            onPanResponderTerminate: this.onReleaseItem,
        });
    }

    onToggle = () => {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
        this.setState({
            height: this.state.height === null ? 0 : null,
        })
    }

    onReleaseItem = (event, gesture) => {
        let config = {
            toValue: { x: 0, y: 0 },
            duration: 500,
        };

        Animated.spring(
            this.state.position,
            config,
        ).start();
    }


    render() {
        const { content, title } = this.props;
        const { height, position } = this.state;
        return (
            <Animated.View
                style={position.getLayout()}
                {...this.panResponder.panHandlers}
            >
            <TouchableWithoutFeedback
                onPress={() => this.onToggle()}
            >
                <View
                    style={styles.main}
                >
                    <Text style={styles.title} >
                        {title}
                    </Text>
                    <Text style={[styles.content, { height }]} >
                        {content}
                    </Text>
                </View>
                </TouchableWithoutFeedback>
            </Animated.View>
        );
    }
}

const styles = {
    main: {
        backgroundColor: 'white',
        overflow: 'hidden',
        margin: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        padding: 15,
        textAlign: 'center'
    },
    content: {
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
    },
    row: {
        backgroundColor: '#ecf0f1',
        borderBottomWidth: 1,
        borderColor: '#ecf0f1',
        flexDirection: 'row',
    },
    pan: {
        flex: 1,
    }
};

export default Panel;
