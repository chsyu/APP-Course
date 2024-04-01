import React from "react";
import { Box } from "@gluestack-ui/themed"
import AlbumList from "../components/AlbumList";
import albumData from "../json/albums.json";

const AlbumScreen = ({ navigation }) => {
  return (
    <Box>
      <AlbumList 
        list={albumData.albumList}
        navigation={navigation}
      />
    </Box>
  );
};

export default AlbumScreen;
