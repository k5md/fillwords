import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import Home from 'app/screens/Home';
import Game from 'app/screens/Game';
import Options from 'app/screens/Options';

const RNApp = createSwitchNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: { header: null, gesturesEnabled: false }
        },
        Game: {
            screen: Game,
            navigationOptions: { header: null, gesturesEnabled: false }
        },
        Options: {
            screen: Options,
            navigationOptions: { header: null, gesturesEnabled: false }
        }
    },
    {
        initialRouteName: 'Home'
    }
);

export default RNApp;
