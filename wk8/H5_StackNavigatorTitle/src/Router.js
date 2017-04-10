import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Button, Linking } from 'react-native';

import PageOne from './components/PageOne';
import PageTwo from './components/PageTwo';

export const StackRouter = StackNavigator({
  Albums: {
    screen: PageOne,
    navigationOptions: {
      title: 'ALBUMS',
    },
  },
  Details: {
    screen: PageTwo,
    navigationOptions: {
      header: ({ state }) => ({
        title: `${state.params.title.toUpperCase()}`,
        right: (
          <Button
            title='Buy'
            onPress={() => Linking.openURL(state.params.url)}
          />
        ),
      })
    },
  },
});
