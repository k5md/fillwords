import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Modal from 'react-native-modalbox';
import styles from './styles';
import dictionary from '../../utils/Dictionaries';

class GameEndView extends Component {
  async componentDidMount() {
    const { words } = this.props;
    const promises = words.map(({
      guessed,
      word,
      srsStatus,
    }) => {
      console.log(word, srsStatus);
      return dictionary.updateWord(
        { word },
        { srsStatus: guessed ? srsStatus + 1 : srsStatus, lastReviewed: Date.now() },
      );
    });
    await Promise.all(promises);
  }

  render() {
    const {
      clearGame,
      navigation,
      isOpen,
      words,
    } = this.props;
    return (
      <Modal
        onClosed={() => {
          // console.log(self, self.props);
          clearGame();
          navigation.navigate('Home');
        }}
        isOpen={isOpen}
        onOpened={() => this.componentDidMount()}
        style={styles.words_preview_container}
        position="top"
        swipeArea={20}
      >
        <View>
          <View style={styles.words_preview_title}>
            <Text style={styles.words_preview_title_text}>Congratulations!</Text>
          </View>
          <View style={styles.words_preview_title_hairline} />
          <ScrollView>
            {words.map(item => (
              <View key={_.uniqueId()} style={styles.words_preview_content_entry}>
                <Text style={styles.words_preview_content_entry_text}>{item.word}</Text>
                <Text style={styles.words_preview_content_entry_text}>
                  {item.srsStatus}
                  -&gt;
                </Text>
                <Text style={styles.words_preview_content_entry_text}>
                  {item.discarded ? item.srsStatus : item.srsStatus + 1}
                </Text>
              </View>
            ))}
          </ScrollView>
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
