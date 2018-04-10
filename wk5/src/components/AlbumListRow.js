// Import libraries for making a component
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
// import AlbumDetail from './AlbumDetail';
import albums from '../json/albums.json';
import AlbumList from './AlbumList';

// Make a component
class AlbumListRow extends Component {
  state = { albums: [] };

  componentWillMount() {
    // debugger;
    this.setState({ albums });
    console.log(this.state);
  }

  renderAlbums() {
    return this.state.albums.map((album) => 
      <AlbumList key={album.title} />
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
export default AlbumListRow;
