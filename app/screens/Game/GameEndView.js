import React, { Component } from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Modal, AdsInlineBanner } from '../../elements';
import dictionary from '../../utils/Dictionaries';
import { translate } from '../../localizations';
import AppStyles from '../../config/styles';
import { StyleSheet } from 'react-native';

const { color, fontSizes } = AppStyles;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: color.COLOR_WHITE,
    borderColor: color.COLOR_BLACK_TRANSP,
    borderWidth: 2,
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  button_text: {
    fontSize: fontSizes.FONT_SIZE_BASE,
  },
  content_container: {
    marginTop: '2%',
    flex: 1,
  },
  content: {
    marginHorizontal: '5%',
    marginVertical: '2%',
  },
  content_entry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content_entry_text: {
    fontSize: fontSizes.FONT_SIZE_BASE,
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
        <AdsInlineBanner />
        <ScrollView style={styles.content_container}>
          {words.map(item => (
            <View key={_.uniqueId()} style={styles.content_entry}>
              <View style={styles.content}>
                <Text style={styles.content_entry_text}>{item.word}</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.content_entry_text}>
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
          style={styles.button}
        >
          <View>
            <Text style={styles.button_text}>{translate('done')}</Text>
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
