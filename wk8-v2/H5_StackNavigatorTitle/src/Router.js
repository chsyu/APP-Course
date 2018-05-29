import { createStackNavigator } from 'react-navigation';
import PageOne from './components/PageOne';
import PageTwo from './components/PageTwo';

export const StackRouter = createStackNavigator({
  Albums: {
    screen: PageOne,
  },
  Details: {
    screen: PageTwo,
    },
  },
);


