import React from "react";
import { View } from "react-native";
import Header from "./src/components/Header";
import AlbumList from "./src/components/AlbumList";

const App = () => {
  return (
    <View>
      <Header />
      <AlbumList />
    </View>
  );
};

export default App;
