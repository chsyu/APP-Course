import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Header from "./src/components/Header";
import AlbumList from "./src/components/AlbumList";
import albumData from "./src/json/albums.json";

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <Header title={albumData.albumTitle} />
      <AlbumList list={albumData.albumList} />
    </SafeAreaView>
  );
};

export default App;
