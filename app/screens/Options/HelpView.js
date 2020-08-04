import React from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modalbox';
import styles from './styles';
import { translate } from '../../localizations';

const HelpView = props => {
  const { showHelp, toggleShowHelp } = props;

  return (
    <Modal
      isOpen={showHelp}
      onClosed={() => showHelp && toggleShowHelp()}
      style={styles.help_modal_container}
      position="top"
      backdropPressToClose={false}
      backButtonClose={false}
      swipeArea={20}
    >
      <View style={styles.words_preview_container}>
        <View style={styles.words_preview_title}>
          <Text style={styles.words_preview_title_text}>
            {translate('help')}
          </Text>
        </View>
        <View style={styles.words_preview_title_hairline} />
        <ScrollView style={styles.container}>
          <View style={[styles.container, styles.body_item]}>
            <Text style={styles.help_text}>{translate('helpText')}</Text>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={() => toggleShowHelp()}>
          <View style={[styles.words_preview_button, styles.body_item]}>
            <Text style={styles.words_preview_button_text}>
              {translate('done')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

HelpView.propTypes = {
  showHelp: PropTypes.bool.isRequired,
  toggleShowHelp: PropTypes.func.isRequired,
};

export default HelpView;
