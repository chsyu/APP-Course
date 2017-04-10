// Import libraries for making a component
import React from 'react';
import { Text, View, Image, Button, Linking } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Header from './Header';

// Make a component
const AlbumDetail = ({ album }) => {
  const { title, 
          artist, 
          thumbnail_image, 
          image, 
          url 
  } = album;

  const {
    thumbnailStyle,
    headerContentStyle,
    thumbnailContainerStyle,
    imageStyle
  } = styles;

    return (
      <Card>
        <CardSection>
          <View style={thumbnailContainerStyle}>
            <Image
              style={thumbnailStyle}
              source={{ uri: thumbnail_image }}
            />
          </View>
          <View style={headerContentStyle}>
            <Text>{title}</Text>
            <Text>{artist}</Text>
          </View>
        </CardSection>
        <CardSection>
          <Image
            style={imageStyle}
            source={{ uri: image }}
          />
        </CardSection>
        <Button 
          onPress={() => Linking.openURL(url)}
          title="More Detail"
          color="gray"
        />
      </Card>
    );
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};


// Make the component available to other parts of the app
export default AlbumDetail;
