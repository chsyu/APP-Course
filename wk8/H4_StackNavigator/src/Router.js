import { StackNavigator } from 'react-navigation';
import PageOne from './components/PageOne';
import PageTwo from './components/PageTwo';

export const StackRouter = StackNavigator({
  Albums: {
    screen: PageOne,
  },
  Details: {
    screen: PageTwo,
  },
},
);


