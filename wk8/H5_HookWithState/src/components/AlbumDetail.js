import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking} from "react-native";

const AlbumDetail = ({ album, navigation }) => {
   return (
      <View style={styles.cardContainerStyle}>
        <View style={[styles.thumbnailContainerStyle, styles.cardSectionStyle]}>
          <Image
            style={styles.thumbnailStyle}
            source={{
              uri: album.thumbnail_image
            }}
          />
          <View style={styles.headerContentStyle}>
            <Text>{album.title}</Text>
            <Text>{album.artist}</Text>
          </View>
        </View>
        <View style={styles.cardSectionStyle}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Detail', album)}
          >
            <Image
              style={styles.imageStyle}
              source={{
                uri: album.image
              }}
            />
          </TouchableOpacity>
        </View>   
      </View>
  )};

const styles = StyleSheet.create({
  thumbnailContainerStyle: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  thumbnailStyle: {
    height: 50,
    width: 50,
    margin: 5
  },
  headerContentStyle: {
    flexDirection: "column",
    justifyContent: "space-around",
    paddingLeft: 10
  },
  cardContainerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
  cardSectionStyle: {
    padding: 5,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderBottomWidth: 1
  },
  imageStyle: {
    height: 300,
    width: null
  }
});

export default AlbumDetail;
