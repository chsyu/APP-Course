/* @flow */

import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { List, ListItem, Button, Card } from 'react-native-elements';
import libraryList from './json/libraryList.json';


export default class Counter extends Component {
  state = {
    libraryList: [],
    book: {}
  };

  componentWillMount() {
    this.setState({ libraryList });
  }

  render() {
    const { 
      container, 
      leftStyle, 
      rightStyle, 
      itemText, 
      cardStyle, 
      cardTitle,
      cardDescription }  = styles;
    return (
      <View style={ container }>
        <ScrollView style={leftStyle}>
          <List>
            {this.state.libraryList.map((book) => (
              <ListItem
                key={book.title}
                title={<Text style={itemText}>{book.title}</Text>}
                onPress={() => this.setState({ book })}
              />
            ))}
          </List>
        </ScrollView>
        <Card containerStyle={ cardStyle }>
          <Text style={cardTitle}>{this.state.book.title}</Text>
          <Text style={cardDescription}>{this.state.book.description}</Text>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  leftStyle: {
    flex: 1,
  },
  rightStyle: {
    flex: 2,
  },
  cardStyle: {
    flex: 2,
  },
  itemText: {
    paddingLeft: 30,
  },
  cardTitle: {
    marginBottom: 10,
    fontSize: 40,
    fontWeight: 'bold'
  },
  cardDescription: {
    fontSize: 20,
    color: 'gray'
  }
});
