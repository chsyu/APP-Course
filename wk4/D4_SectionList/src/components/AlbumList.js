import React from "react";
import { SectionList } from "react-native";
import AlbumDetail from "./AlbumDetail";
import sections from "../json/album_section.json";

const Albumlist = () => {

  return (
    <SectionList 
      sections={sections}
      renderItem={({ item }) => <AlbumDetail album={item} />}
      keyExtractor={ item => item.title }
    />
  );
};


export default Albumlist;
