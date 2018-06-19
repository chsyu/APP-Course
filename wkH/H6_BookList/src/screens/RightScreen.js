/* @flow */

import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';
import styles from '../styles/styles';

import { observer, inject } from 'mobx-react/native';

@inject('store') @observer
class RightScreen extends Component {

  render() {
    const { 
      cardStyle, 
      cardTitle,
      cardDescription }  = styles;
    return (
      <Card containerStyle={ cardStyle }>
         <Text style={cardTitle}>{this.props.store.state.book.title}</Text>
         <Text style={cardDescription}>{this.props.store.state.book.description}</Text>
      </Card>
    );
  }
}

export default RightScreen;