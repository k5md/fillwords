import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import Home from 'app/screens/Home';
import Game from 'app/screens/Game';
import WordsPreviewContainer from 'app/screens/Game/WordsPreviewContainer';
import GameEndContainer from 'app/screens/Game/GameEndContainer';
import Options from 'app/screens/Options';
import Statistics from 'app/screens/Statistics';

const GameStackNavigator = createStackNavigator(
    {
        Main: {
            screen: Game,
            navigationOptions: { header: null, gesturesEnabled: false },
        },
        WordsPreviewModal: {
            screen: WordsPreviewContainer,
        },
        GameEndModal: {
            screen: GameEndContainer,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
        initialRouteName: 'Main',
        transparentCard: true,
    },
);

const RootSwitch = createSwitchNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: { header: null, gesturesEnabled: false },
        },
        Game: {
            screen: GameStackNavigator,
            navigationOptions: { header: null, gesturesEnabled: false },
        },
        Options: {
            screen: Options,
            navigationOptions: { header: null, gesturesEnabled: false },
        },
        Statistics: {
            screen: Statistics,
            navigationOptions: { header: null, gesturesEnabled: false },
        }
    },
    {
        header: null,
        gesturesEnabled: false,
        initialRouteName: 'Home'
    }
);

export default RootSwitch;
