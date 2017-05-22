import React, { Component } from 'react';
import {
    View,
    Text,
    LayoutAnimation,
    TouchableWithoutFeedback,
    UIManager
} from 'react-native';
import { connect } from 'react-redux';

import { Card } from 'react-native-elements';

import * as actions from '../actions';



class Panel extends Component {
    onToggle = () => {
        const { id } = this.props.library;
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    render() {
        console.log(this.props);
        this.props.selectLibrary(1);
        const { description, title } = this.props.library;
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
                    <Text style={[styles.content]} >
                        {description}
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


const mapStateToProps = state => { 
    // console.log(state.selectedLibraryId);
    return { selectedLibraryId: state.selectedLibraryId }
};

export default connect(mapStateToProps, actions)(Panel);


