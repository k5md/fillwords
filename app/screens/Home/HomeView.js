import React, { Component } from 'react';
import { View, Alert, Text, Button, Image, BackHandler, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from 'app/utils/androidBackButton';
import HomeAnimationContainer from './HomeAnimationContainer';
import SvgUri from 'react-native-svg-uri';
import icon from 'app/assets/fontawesome-free-5.6.1-desktop/svgs/solid/play.svg';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

class HomeView extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        handleAndroidBackButton(() => {
            console.log('back button from homeview');
            return Alert.alert(
                'Confirm exit',
                'Do you want to quit the app?',
                [
                  {text: 'CANCEL', style: 'cancel'},
                  {text: 'OK', onPress: () => BackHandler.exitApp()}
                ]
            );
        });
    }

    componentWillUnmount() {
        removeAndroidBackButtonHandler();
        console.log('unmounting homeview');
    }

    render() {
        return (
            <View style={[styles.container, styles.body]}>
                <HomeAnimationContainer />
                <Text style={styles.title}>FILLWORDS</Text>
                <View style={styles.container_buttons}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Statistics')}
                    >
                        <SvgUri 
                            width="100"
                            height="100"
                            source={{uri: resolveAssetSource(require('app/assets/fontawesome-free-5.6.1-desktop/svgs/solid/chart-pie.svg')).uri}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Game')}
                    >
                        <SvgUri 
                            width="150"
                            height="150"
                            source={{uri: resolveAssetSource(require('app/assets/fontawesome-free-5.6.1-desktop/svgs/solid/play.svg')).uri}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Options')}
                    >
                        <SvgUri 
                            width="100"
                            height="100"
                            source={{uri: resolveAssetSource(require('app/assets/fontawesome-free-5.6.1-desktop/svgs/solid/cog.svg')).uri}}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

export default HomeView;
