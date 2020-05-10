import React, { useContext } from "react";
import { View, FlatList } from "react-native";
import AlbumDetail from "../components/AlbumDetail";
import { StoreContext } from "../stores/AlbumStore";

const AlbumScreen = ({ navigation }) => {
  const { albumsState } = useContext(StoreContext);
  const [albums, setAlbums] = albumsState;
  return (
    <View style={{flex: 1}}>
      <FlatList
      data={albums}
      renderItem={({ item }) => 
      <AlbumDetail 
        album={item}       
        navigation={navigation}
      />}
      keyExtractor={item => item.title}
      />
    </View>
  );
};

export default AlbumScreen;
