import React from "react";
import { FlatList } from "react-native";
import AlbumDetail from "./AlbumDetail";

const AlbumList = ({ list }) => { 
  const renderItem = ({ item }) => <AlbumDetail album={item} />;
  return (
    <FlatList
      data={list}
      renderItem={renderItem}
      keyExtractor={item => item.title}
    />    
  );  
}

export default AlbumList;

