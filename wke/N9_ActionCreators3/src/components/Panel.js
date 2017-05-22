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
        const { selectedId } = this.props;
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
        this.props.selectLibrary(id === selectedId ? null : id)
    }

    render() {
        const { description, title } = this.props.library;
        const { expanded } = this.props;
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
                    <Text style={[styles.content, { height: expanded ? null : 0 }]} >
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


const mapStateToProps = (state, ownProps) => {
    const expanded = state.selectedLibraryId === ownProps.library.id;
    return { expanded, selectedId: state.selectedLibraryId };
};

export default connect(mapStateToProps, actions)(Panel);
