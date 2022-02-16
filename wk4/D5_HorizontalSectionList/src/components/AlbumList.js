import React from "react";
import { Text, FlatList, SectionList, StyleSheet } from "react-native";
import AlbumDetail from "./AlbumDetail";
import HotAlbumDetail from "./HotAlbumDetail";
import sections from "../json/album_section.json";

const Albumlist = () => {

  return (
    <SectionList 
      sections={sections}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      stickySectionHeadersEnabled={false}
      showsHorizontalScrollIndicator={false}
      renderSectionHeader={({section}) => (
        <>
          <Text style={styles.sectionHeader}>{section.title}</Text>
          {section.horizontal ? (
            <FlatList
              horizontal={true}
              data={section.data}
              renderItem={({ item }) => <HotAlbumDetail album={item} />}
              showsHorizontalScrollIndicator={false}
              keyExtractor={ item => item.title }
            />
          ) : null}
        </>
      )}
      renderItem={({ item, section }) => {
        if (section.horizontal) {
          return null;
        }
        return <AlbumDetail album={item} />
      }}
      keyExtractor={ item => item.title }
    />
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    fontWeight: '600',
    fontSize: 18,
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 10,
    textTransform: 'uppercase',
  },
})

export default Albumlist;
