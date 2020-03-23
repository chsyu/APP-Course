import React from "react";
import { View, FlatList } from "react-native";
import Header from "./src/components/Header";
import AlbumDetail from "./src/components/AlbumDetail";
import albumData from "./src/json/albums.json";

const App = () => {
  return (
    <View>
      <Header title={albumData.albumTitle} />
      <FlatList
      data={albumData.albumList}
      renderItem={({ item }) => <AlbumDetail album={item} />}
      keyExtractor={item => item.title}
      />
    </View>
  );
};

export default App;
