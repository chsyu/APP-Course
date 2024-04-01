import React from "react";
import { Box } from "@gluestack-ui/themed"
import AlbumList from "../components/AlbumList";
import albumData from "../json/albums.json";

const AlbumScreen = () => {
  return (
    <Box>
      <AlbumList list={albumData.albumList} />
    </Box>
  );
};

export default AlbumScreen;
