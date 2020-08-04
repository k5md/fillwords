import React from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Modal } from '../../elements';
import { translate } from '../../localizations';
import { StyleSheet } from 'react-native';
import AppStyles from '../../config/styles';

const { color, fontSizes } = AppStyles;

const styles = StyleSheet.create({
  modal_compact: {
    marginTop: '15%',
    height: '80%',
    width: '80%',
    backgroundColor: 'transparent',
  },
  modal_container: {
    backgroundColor: color.COLOR_WHITE,
  },
  body_item: {
    backgroundColor: color.COLOR_WHITE,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  container: {
    flex: 1,
  },
  help_text: {
    fontSize: fontSizes.FONT_SIZE_BASE,
    textAlign: 'justify',
  },

  button: {
    alignItems: 'center',
    backgroundColor: color.COLOR_WHITE,
    borderColor: color.COLOR_BLACK_TRANSP,
    borderRadius: 1,
    borderWidth: 2,
    justifyContent: 'center',
    margin: 0,
  },
  button_text: {
    fontSize: fontSizes.FONT_SIZE_BASE, // 8
  },
});

const HelpView = props => {
  const { showHelp, toggleShowHelp } = props;

  return (
    <Modal
      isOpen={showHelp}
      onClosed={() => showHelp && toggleShowHelp()}
      title={translate('help')}
      modalStyle={styles.modal_compact}
      containerStyle={styles.modal_container}
    >
      <ScrollView style={styles.container}>
        <View style={[styles.container, styles.body_item]}>
          <Text style={styles.help_text}>{translate('helpText')}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => toggleShowHelp()}>
        <View style={[styles.button, styles.body_item]}>
          <Text style={styles.button_text}>{translate('done')}</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

HelpView.propTypes = {
  showHelp: PropTypes.bool.isRequired,
  toggleShowHelp: PropTypes.func.isRequired,
};

export default HelpView;
