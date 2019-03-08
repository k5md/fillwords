import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Modal from 'react-native-modalbox';
import styles from './styles';
import dictionary from '../../utils/Dictionaries';
import { translate } from '../../localizations';

class GameEndView extends Component {
  async componentDidMount() {
    const { words } = this.props;
    const promises = words.map(({ guessed, word, srsStatus }) => dictionary.updateWord(
      { word },
      { srsStatus: guessed ? srsStatus + 1 : srsStatus, lastReviewed: Date.now() },
    ));
    await Promise.all(promises);
  }

  closeModal() {
    const {
      clearGame,
      navigation,
    } = this.props;

    clearGame();
    navigation.navigate('Home');
  }

  render() {
    const {
      isOpen,
      words,
    } = this.props;
    return (
      <Modal
        onClosed={this.closeModal}
        isOpen={isOpen}
        onOpened={() => this.componentDidMount()}
        style={styles.words_preview_container}
        position="top"
        swipeArea={20}
      >
        <View>
          <View style={styles.words_preview_title}>
            <Text style={styles.words_preview_title_text}>{translate('congratulations')}</Text>
          </View>
          <View style={styles.words_preview_title_hairline} />
          <ScrollView>
            {words.map(item => (
              <View key={_.uniqueId()} style={styles.words_preview_content_entry}>
                <Text style={styles.words_preview_content_entry_text}>{item.word}</Text>
                <Text style={styles.words_preview_content_entry_text}>
                  {`${item.srsStatus}->${item.discarded ? item.srsStatus : item.srsStatus + 1}`}
                </Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={this.closeModal}>
            <View style={styles.words_preview_button}>
              <Text style={styles.words_preview_button_text}>{translate('done')}</Text>
            </View>
          </TouchableOpacity>
        </View>
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
