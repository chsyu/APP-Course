import React from "react";
import { ScrollView } from "react-native";
import AlbumDetail from "./AlbumDetail";

const Albumlist = () => {
  return (
    <ScrollView>
      <AlbumDetail />
      <AlbumDetail />
      <AlbumDetail />
    </ScrollView>
  );
};

export default Albumlist;

