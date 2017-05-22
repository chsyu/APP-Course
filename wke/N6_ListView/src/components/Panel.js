import React, { Component } from 'react';
import {
    View,
    Text,
    LayoutAnimation,
    TouchableWithoutFeedback,
    UIManager
} from 'react-native';

import { Card } from 'react-native-elements';

class Panel extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.expanded);
        this.state = {
            height: this.props.expanded ? null : 0
        };
    }

    onToggle = () => {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
        this.setState({
            height: this.state.height === null ? 0 : null,
        })
    }

    render() {
        const { content, title } = this.props.library;
        const { height } = this.state;
        console.log(this.state);
        return (
            <TouchableWithoutFeedback
                onPress={() => this.onToggle()}
            >
                <Card
                    style={styles.main}
                >
                    <Text style={styles.title} >
                        {title}
                    </Text>
                    <Text style={[styles.content, { height }]} >
                        {content}
                    </Text>
                </Card>
            </TouchableWithoutFeedback>
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
    }
};

export default Panel;
