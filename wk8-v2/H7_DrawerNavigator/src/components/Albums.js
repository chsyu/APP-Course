import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';

import albums from '../json/albums.json';

// Make a component
class Albums extends Component {
  state = { albums: [] };

  static navigationOptions = ({ navigation }) => {
    return {
      // title: 'Albums',
      // tabBarLabel: 'Albums',
      // tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
      drawerLabel: 'Albums',
      drawerIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
      headerLeft: (
        <Icon
          name='menu'
          iconStyle={{ marginLeft: 10 }}
          onPress={() => navigation.openDrawer()}
        />
      ),
    }
  };

  componentWillMount() {
    this.setState({ albums });
  }

  goToPageTwo = (album) => {
    this.props.navigation.navigate('Details', { ...album });
  };

  render() {
    return (
      <ScrollView>
        <List>
          {this.state.albums.map((album) => (
            <ListItem
              key={album.title}
              roundAvatar
              avatar={{ uri: album.image }}
              title={album.title}
              subtitle={album.artist}
              onPress={() => this.goToPageTwo(album)}
              // hideChevron
              // rightTitle='More...'
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}

export default Albums;
