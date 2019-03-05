import React, { Component } from 'react';
import {
  View,
  Alert,
  Text,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import SvgUri from 'react-native-svg-uri';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../../utils/androidBackButton';
import AppStyles from '../../config/styles';
import images from '../../config/images';
import HomeAnimationContainer from './HomeAnimationContainer';
import { translate } from '../../localizations';
import styles from './styles';

const { color } = AppStyles;

class HomeView extends Component {
  componentDidMount() {
    handleAndroidBackButton(() => Alert.alert(
      translate('confirmExit'),
      translate('confirmExitQuestion'),
      [
        { text: translate('cancel'), style: 'cancel' },
        { text: translate('ok'), onPress: () => BackHandler.exitApp() },
      ],
    ));
  }

  componentWillUnmount() {
    removeAndroidBackButtonHandler();
    // console.log('unmounting homeview');
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={[styles.container, styles.body]}>
        <HomeAnimationContainer />
        <View style={[styles.container, styles.title]}>
          <Text style={styles.title_text}>FILLWORDS</Text>
        </View>
        <View style={[styles.container, styles.container_buttons]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Statistics')}
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
            onPress={() => navigation.navigate('Game')}
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
            onPress={() => navigation.navigate('Options')}
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

HomeView.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default HomeView;
