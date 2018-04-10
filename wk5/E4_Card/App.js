import React from 'react';
import { AppRegistry, View } from 'react-native';
import Header from './src/components/Header';
import AlbumList from './src/components/AlbumList';

const wk5 = () => (
      <View>
        <Header headerText={'Albums'} />    
        <AlbumList />  
      </View>
    );

export default wk5;