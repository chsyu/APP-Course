import React from "react";
import { FlatList } from "native-base";
import Detail from "./Detail";

const List = ({ list, navigation }) => {
  const renderItem = ({ item }) => <Detail item={item} navigation={navigation} />;
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

export default List;

