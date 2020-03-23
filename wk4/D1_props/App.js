import React from "react";
import { View } from "react-native";
import Header from "./src/components/Header";
import AlbumList from "./src/components/AlbumList";
import albumData from "./src/json/albums.json";

const App = () => {
  return (
    <View>
      <Header title={albumData.albumTitle} />
      <AlbumList />
    </View>
  );
};

export default App;
