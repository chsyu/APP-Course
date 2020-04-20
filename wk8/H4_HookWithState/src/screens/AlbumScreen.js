import React, { useState } from "react";
import { View, FlatList } from "react-native";
import AlbumDetail from "../components/AlbumDetail";
import albumData from "../json/albums.json";

const AlbumScreen = ({ navigation }) => {
  const [albumState, setAlbumData] = useState(albumData.albumList);
  return (
    <View style={{flex: 1}}>
      <FlatList
      data={albumState}
      renderItem={({ item }) => 
      <AlbumDetail 
        album={item}       
        navigation={navigation}
      />}
      keyExtractor={item => item.title}
      />
    </View>
  );
};

export default AlbumScreen;
