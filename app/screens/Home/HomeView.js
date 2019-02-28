import React, { Component } from 'react';
import {
  View, Alert, Text, Button, Image, BackHandler, TouchableOpacity, FlatList,
} from 'react-native';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from 'app/utils/androidBackButton';
import SvgUri from 'react-native-svg-uri';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import AppStyles from 'app/config/styles';
import images from 'app/config/images';
import HomeAnimationContainer from './HomeAnimationContainer';
import styles from './styles';

const { color, fonts } = AppStyles;

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
          { text: 'CANCEL', style: 'cancel' },
          { text: 'OK', onPress: () => BackHandler.exitApp() },
        ],
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
              width="75"
              height="75"
              fill={color.COLOR_BLACK_TRANSP}
              svgXmlData={images.icons.chartPie}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Game')}
          >
            <SvgUri
              width="100"
              height="100"
              fill={color.COLOR_BLACK_TRANSP}
              svgXmlData={images.icons.play}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Options')}
          >
            <SvgUri
              width="75"
              height="75"
              fill={color.COLOR_BLACK_TRANSP}
              svgXmlData={images.icons.cog}
            />
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

export default HomeView;
