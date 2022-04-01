import React from "react";
import { FlatList } from "native-base";
import BookDetail from "./BookDetail";

const BookList = ({ list, navigation }) => {
  const renderItem = ({ item }) => <BookDetail book={item} navigation={navigation} />;
  return (
    <FlatList
    _dark={{ bg: "blueGray.900" }}
    _light={{ bg: "white" }}
      data={list}
      renderItem={renderItem}
      keyExtractor={item => item.title}
    />    
  );  
}

export default BookList;

