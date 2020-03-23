import React from "react";
import { View, FlatList } from "react-native";
import Header from "./src/components/Header";
import albumData from "./src/json/albums.json";

const App = () => {
  return (
    <View>
      <Header title={albumData.albumTitle}/>
      <FlatList
        data={albumData.albumList}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        keyExtractor={item => item.title}
      />
    </View>
  );
};

export default App;
