import React, { Component } from 'react';
import { View, Alert, Text, BackHandler, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { SvgXml } from 'react-native-svg';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from '../../utils/androidBackButton';
import AppStyles from '../../config/styles';
import images from '../../config/images';
import HomeAnimation from './HomeAnimation';
import LoadingView from './LoadingView';
import { translate } from '../../localizations';
import { StyleSheet } from 'react-native';

const { color, fontSizes } = AppStyles;

const styles = StyleSheet.create({
  body: {
    backgroundColor: color.COLOR_GREYISH,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    height: 100,
    justifyContent: 'center',
    padding: 10,
    width: 100,
  },
  button_play: {
    height: 150,
    width: 150,
  },
  container: {
    flex: 1,
  },
  container_buttons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title_sub: {},
  title_text: {
    color: color.COLOR_BLACK_TRANSP,
    fontFamily: 'sans-serif-condensed',
    fontSize: fontSizes.FONT_SIZE_LARGE,
  },
});

class HomeView extends Component {
  componentDidMount() {
    this.backHandler = handleAndroidBackButton(() =>
      Alert.alert(translate('confirmExit'), translate('confirmExitQuestion'), [
        { text: translate('cancel'), style: 'cancel' },
        { text: translate('ok'), onPress: () => BackHandler.exitApp() },
      ]),
    );
  }

  componentWillUnmount() {
    removeAndroidBackButtonHandler(this.backHandler);
  }

  render() {
    const { navigation, isDBReady } = this.props;

    return (
      <View style={[styles.container, styles.body]}>
        <LoadingView isOpen={!isDBReady} />
        <HomeAnimation />
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
