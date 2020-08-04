import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Modal } from '../../elements';
import SplashScreen from 'react-native-splash-screen';
import AppStyles from '../../config/styles';
import { translate } from '../../localizations';
import { StyleSheet } from 'react-native';

const { fontSizes } = AppStyles;

const styles = StyleSheet.create({
  content: {
    marginHorizontal: '5%',
    marginVertical: '2%',
    alignItems: 'center',
  },
  entry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  entry_text: {
    fontSize: fontSizes.FONT_SIZE_BASE,
    lineHeight: fontSizes.FONT_SIZE_SMALL,
  },
});

const LoadingView = props => {
  useEffect(() => {
    SplashScreen.hide();
  });

  const { isOpen } = props;

  return (
    <Modal isOpen={isOpen} title={translate('loading')}>
      <View style={styles.content}>
        <View style={styles.entry}>
          <Text style={styles.entry_text}>{translate('loadingText')}</Text>
        </View>
      </View>
    </Modal>
  );
};

LoadingView.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default LoadingView;
