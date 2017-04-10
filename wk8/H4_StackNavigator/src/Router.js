import { StackNavigator } from 'react-navigation';

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
      })
    },
  },
});
