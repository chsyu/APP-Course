import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Tile, List, ListItem, Icon } from 'react-native-elements';

import me from '../json/me.json';

// Make a component
class Me extends Component {
  state = { me: [] };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Me',
      tabBarLabel: 'Me',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />,
      drawerLabel: 'Me',
      drawerIcon: ({ tintColor }) => <Icon name="account-circle" size={25} color={tintColor} />,
      headerLeft: (
        <Icon
          name='menu'
          iconStyle={{ marginLeft: 10 }}
          onPress = {
            () => navigation.openDrawer()
          }
        />
      ),
    };
  }
  componentWillMount() {
    this.setState({ me });
  }

  render() {
    return (
      <ScrollView>
        <Tile
          imageSrc={require('../assets/ntue.jpg')}
          featured
          title={`${this.state.me.name.first.toUpperCase()} ${this.state.me.name.last.toUpperCase()}`}
          caption={this.state.me.email}
        />

        <List>
          <ListItem
            title="Email"
            rightTitle={this.state.me.email}
            hideChevron
          />
          <ListItem
            title="Phone"
            rightTitle={this.state.me.phone}
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title="Username"
            rightTitle={this.state.me.login.username}
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title="Birthday"
            rightTitle={this.state.me.dob}
            hideChevron
          />
          <ListItem
            title="City"
            rightTitle={this.state.me.location.city}
            hideChevron
          />
        </List>
      </ScrollView>
    );
  }
}

export default Me;
