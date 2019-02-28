import { createSwitchNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Game from '../screens/Game';
import Options from '../screens/Options';
import Statistics from '../screens/Statistics';

const RootSwitch = createSwitchNavigator(
  {
    Home: {
      screen: Home,
    },
    Game: {
      screen: Game,
    },
    Options: {
      screen: Options,
    },
    Statistics: {
      screen: Statistics,
    },
  },
  {
    header: null,
    gesturesEnabled: false,
    initialRouteName: 'Home',
  },
);

export default RootSwitch;
