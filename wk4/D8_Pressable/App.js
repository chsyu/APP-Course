import React from "react";
import { View, FlatList } from "react-native";
import Header from "./src/components/Header";
import AlbumList from "./src/components/AlbumList";
import albumData from "./src/json/albums.json";

const App = () => {
  return (
    <View style={{flex: 1}}>
      <Header title={albumData.albumTitle} />
      <AlbumList list={albumData.albumList}/>
    </View>
  );
};

export default App;
