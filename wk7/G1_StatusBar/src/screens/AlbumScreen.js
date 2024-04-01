import React from "react";
import { StatusBar } from "expo-status-bar";
import { Box } from "@gluestack-ui/themed"
import AlbumList from "../components/AlbumList";
import albumData from "../json/albums.json";

const AlbumScreen = () => {
  return (
    <Box>
      <StatusBar style="light" />
      <AlbumList list={albumData.albumList} />
    </Box>
  );
};

export default AlbumScreen;
