import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Header from "./src/components/Header";
import AlbumList from "./src/components/AlbumList";

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar />
      <Header />
      <AlbumList />
    </SafeAreaView>
  );
};

export default App;
