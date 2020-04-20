import React, { Component } from "react";
import { View, FlatList } from "react-native";
import AlbumDetail from "../components/AlbumDetail";
import albumData from "../json/albums.json";

class AlbumScreen extends Component {
  constructor(props) {
      super(props)
      this.state = { albumData };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
        data={this.state.albumData.albumList}
        renderItem={({ item }) => 
        <AlbumDetail 
          album={item}       
          navigation={this.props.navigation}
        />}
        keyExtractor={item => item.title}
        />
      </View>
    );
  }
};

export default AlbumScreen;
