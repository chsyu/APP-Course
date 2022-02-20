import React from "react";
import { SectionList } from "react-native";
import AlbumDetail from "./AlbumDetail";
import sections from "../json/album_section.json";

const Albumlist = () => {
  const renderItem = ({ item }) => <AlbumDetail album={item} />;
  return (
    <SectionList 
      sections={sections}
      renderItem={renderItem}
      keyExtractor={ item => item.title }
    />
  );
};


export default Albumlist;
