import React, { useEffect } from 'react';
import {
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modalbox';
import SplashScreen from 'react-native-splash-screen';
import styles from './styles';
import AppStyles from '../../config/styles';
import { translate } from '../../localizations';

const { color } = AppStyles;

const LoadingView = (props) => {
  useEffect(() => {
    SplashScreen.hide();
  });

  const {
    isOpen,
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      style={styles.words_preview_container}
      position="top"
      backdropPressToClose={false}
      backButtonClose={false}
      swipeArea={20}
    >
      <View>
        <View style={styles.words_preview_title}>
          <Text style={styles.words_preview_title_text}>
            {translate('loading')}
          </Text>
        </View>
        <View style={styles.words_preview_title_hairline} />
        <View style={[styles.container, styles.body_item]}>
          <Text style={styles.help_text}>
            {translate('loadingText')}
          </Text>
        </View>
        <View style={[styles.container, styles.body_item]}>
          <ActivityIndicator size="large" color={color.COLOR_BLUE_LIGHT} />
        </View>
      </View>
    </Modal>
  );
};

LoadingView.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default LoadingView;
