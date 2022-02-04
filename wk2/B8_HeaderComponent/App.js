import React from "react";
import { SafeAreaView } from "react-native";
import Header from "./src/components/Header";
import AlbumList from "./src/components/AlbumList";

const App = () => {
  return (
    <>
      <SafeAreaView />
      <Header />
      <AlbumList />
    </>
  );
};

export default App;
