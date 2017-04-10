// Import libraries for making a component
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import AlbumDetail from './AlbumDetail';
import albums from '../json/albums.json';

// Make a component
class AlbumList extends Component {
  state = { albums: [] };

  componentWillMount() {
    // debugger;
    this.setState({ albums });
    console.log(this.state);
  }

  renderAlbums() {
    return this.state.albums.map(album => 
      <AlbumDetail key={album.title} album={album} />
    );
  }

  render() {
    // debugger;
    return (
      <ScrollView>
        {this.renderAlbums()}
      </ScrollView>
    );
  }
}

// Make the component available to other parts of the app
export default AlbumList;
