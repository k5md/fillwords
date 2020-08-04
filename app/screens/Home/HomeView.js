import React, { Component } from 'react';
import {
  View,
  Alert,
  Text,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { SvgXml } from 'react-native-svg';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../../utils/androidBackButton';
import AppStyles from '../../config/styles';
import images from '../../config/images';
import HomeAnimationContainer from './HomeAnimationContainer';
import LoadingView from './LoadingView';
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
    const {
      navigation,
      isDBReady,
    } = this.props;

    return (
      <View style={[styles.container, styles.body]}>
        <LoadingView
          isOpen={!isDBReady}
        />
        <HomeAnimationContainer />
        <View style={[styles.container, styles.title]}>
          <Text style={styles.title_text}>FILLWORDS</Text>
        </View>
        <View style={[styles.container, styles.container_buttons]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Statistics')}
          >
            <SvgXml
              width="75"
              height="75"
              fill={color.COLOR_BLACK_TRANSP}
              xml={images.icons.chartPie}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Game')}
            disabled={!isDBReady}
          >
            <SvgXml
              width="100"
              height="100"
              fill={color.COLOR_BLACK_TRANSP}
              xml={images.icons.play}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Options')}
          >
            <SvgXml
              width="75"
              height="75"
              fill={color.COLOR_BLACK_TRANSP}
              xml={images.icons.cog}
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
  isDBReady: PropTypes.bool.isRequired,
};

export default HomeView;
