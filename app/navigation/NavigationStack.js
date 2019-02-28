import { createSwitchNavigator } from 'react-navigation';

import Home from 'app/screens/Home';
import Game from 'app/screens/Game';
import Options from 'app/screens/Options';
import Statistics from 'app/screens/Statistics';

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
