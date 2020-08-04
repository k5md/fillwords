import React, { Component } from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Modal } from '../../elements';
import dictionary from '../../utils/Dictionaries';
import { translate } from '../../localizations';
import AppStyles from '../../config/styles';
import { StyleSheet } from 'react-native';

const { color, fontSizes } = AppStyles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  words_preview_button: {
    marginHorizontal: '10%',
    marginVertical: '5%',
    padding: 5,
    borderWidth: 2,
    borderRadius: 1,
    borderColor: color.COLOR_BLACK_TRANSP,
    backgroundColor: color.COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  words_preview_button_text: {
    fontSize: fontSizes.FONT_SIZE_BASE, // 8
  },
  words_preview_container: {
    flex: 1,
    borderColor: color.COLOR_BLACK_TRANSP,
    borderRadius: 1,
    borderWidth: 2,
    shadowColor: color.COLOR_GREY_TRANSP,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    justifyContent: 'center',
  },
  words_preview_content_container: {
    marginTop: '2%',
    flex: 1,
  },
  words_preview_content: {
    marginHorizontal: '5%',
    marginVertical: '2%',
  },
  words_preview_content_entry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  words_preview_content_entry_text: {
    fontSize: fontSizes.FONT_SIZE_BASE, // 16 / 2.5,
    lineHeight: fontSizes.FONT_SIZE_SMALL,
  },
});

class GameEndView extends Component {
  async componentDidMount() {
    const { words } = this.props;
    const promises = words.map(({ guessed, word, srsStatus }) =>
      dictionary.updateWord(
        { word },
        {
          srsStatus: guessed ? srsStatus + 1 : srsStatus,
          lastReviewed: Date.now(),
        },
      ),
    );
    await Promise.all(promises);
  }

  closeModal() {
    const { clearGame, navigation } = this.props;

    clearGame();
    navigation.navigate('Home');
  }

  render() {
    const { isOpen, words } = this.props;
    return (
      <Modal
        onClosed={() => this.closeModal()}
        isOpen={isOpen}
        onOpened={() => this.componentDidMount()}
        title={translate('congratulations')}
      >
        <ScrollView style={styles.words_preview_content_container}>
          {words.map(item => (
            <View key={_.uniqueId()} style={styles.words_preview_content_entry}>
              <View style={styles.words_preview_content}>
                <Text style={styles.words_preview_content_entry_text}>
                  {item.word}
                </Text>
              </View>
              <View style={styles.words_preview_content}>
                <Text style={styles.words_preview_content_entry_text}>
                  {`${item.srsStatus}->${
                    item.discarded ? item.srsStatus : item.srsStatus + 1
                  }`}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.closeModal()}
          style={styles.words_preview_button}
        >
          <View>
            <Text style={styles.words_preview_button_text}>
              {translate('done')}
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

GameEndView.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  clearGame: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GameEndView;
