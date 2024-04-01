import React from "react";
import { SafeAreaView, StatusBar, Text, FlatList } from "react-native";
import Header from "./src/components/Header";
import albumData from "./src/json/albums.json";

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <Header title={albumData.albumTitle}/>
      <FlatList
        data={albumData.albumList}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        keyExtractor={item => item.title}
      />
    </SafeAreaView>
  );
};

export default App;
