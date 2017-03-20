// Import libraries for making a component
import React from 'react';
import { Text } from 'react-native';
import Card from './Card';

// Make a component
const AlbumDetail = (props) => {
    return (
      <Card>
        <Text>{props.album.title}</Text>
      </Card>
    );
};

// Make the component available to other parts of the app
export default AlbumDetail;
