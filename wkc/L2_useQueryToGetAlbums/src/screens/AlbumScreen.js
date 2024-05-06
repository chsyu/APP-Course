import React from "react";
import { Box } from "@gluestack-ui/themed"
import AlbumList from "../components/AlbumList";
import { useAlbums } from "../tanstack-query";

const AlbumScreen = () => {
  const { data: albumList } = useAlbums();
  return (
    <Box>
      <AlbumList list={albumList} />
    </Box>
  );
};

export default AlbumScreen;
