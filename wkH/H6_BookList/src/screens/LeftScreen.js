/* @flow */

import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import styles from '../styles/styles';

import { observer, inject } from 'mobx-react/native';

@inject('store') @observer
class LeftScreen extends Component {

  render() {
    const { 
      leftStyle, 
      itemText }  = styles;
    return (
      <ScrollView style={leftStyle}>
         <List>
         {this.props.store.state.libraryList.map((book) => (
            <ListItem
               key={book.title}
               title={<Text style={itemText}>{book.title}</Text>}
               onPress={() => this.props.store.selectBook(book)}
            />
         ))}
         </List>
      </ScrollView>
    );
  }
}

export default LeftScreen;