import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modalbox';
import _ from 'lodash';
import styles from './styles';

class WordsPreviewView extends Component {
  render() {
    const {
      playGame,
      isOpen,
      words,
    } = this.props;
    return (
      <Modal
        onClosed={() => playGame()}
        isOpen={isOpen}
        style={styles.words_preview_container}
        position="top"
        swipeArea={20}
      >
        <View>
          <View style={styles.words_preview_title}>
            <Text style={styles.words_preview_title_text}>Remember:</Text>
          </View>
          <View style={styles.words_preview_title_hairline} />
          <ScrollView>
            {words.map(item => (
              <View key={_.uniqueId()} style={styles.words_preview_content_entry}>
                <Text style={styles.words_preview_content_entry_text}>{item.word}</Text>
                <Text style={styles.words_preview_content_entry_text}>{item.translation}</Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={() => playGame()}>
            <View style={styles.words_preview_button}>
              <Text style={styles.words_preview_button_text}>Done!</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

WordsPreviewView.propTypes = {
  playGame: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  words: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WordsPreviewView;
