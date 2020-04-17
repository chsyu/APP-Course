import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Tile, ListItem, Icon } from 'react-native-elements';

import me from '../json/me.json';

// Make a component
const MeScreen = ({ navigation }) => {
    return (
      <ScrollView>
        <Tile
          imageSrc={require('../../assets/ntue.jpg')}
          featured
          title={`${me.name.first.toUpperCase()} ${me.name.last.toUpperCase()}`}
          caption={me.email}
        />

          <ListItem
            title="Email"
            rightTitle={me.email}
            hideChevron
          />
          <ListItem
            title="Phone"
            rightTitle={me.phone}
            hideChevron
          />

          <ListItem
            title="Username"
            rightTitle={me.login.username}
            hideChevron
          />

          <ListItem
            title="Birthday"
            rightTitle={me.dob}
            hideChevron
          />
          <ListItem
            title="City"
            rightTitle={me.location.city}
            hideChevron
          />
      </ScrollView>
    );
}

export default MeScreen;
