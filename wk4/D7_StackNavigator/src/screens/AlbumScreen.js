import React from "react";
import { View, FlatList } from "react-native";
import Header from "../components/Header";
import AlbumDetail from "../components/AlbumDetail";
import albumData from "../json/albums.json";

const AlbumScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Header title={albumData.albumTitle} />
      <FlatList
      data={albumData.albumList}
      renderItem={({ item }) => <AlbumDetail album={item} />}
      keyExtractor={item => item.title}
      />
    </View>
  );
};

export default AlbumScreen;
