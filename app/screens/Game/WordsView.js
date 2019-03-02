/* eslint no-underscore-dangle: ["error", { "allow": ["_pagerRef"] }] */
/* eslint "react-native/split-platform-components": 1 */
/* eslint "react/no-array-index-key": 0 */

import React, { Component } from 'react';
import {
  View,
  ViewPagerAndroid,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

class WordsView extends Component {
  componentDidUpdate(prevProps) {
    const {
      currentWordIndex: newCurrentWordIndex,
    } = this.props;
    const {
      currentWordIndex: oldCurrentWordIndex,
    } = prevProps;
    if (oldCurrentWordIndex !== newCurrentWordIndex && this._pagerRef) {
      this._pagerRef.setPage(newCurrentWordIndex);
    }
  }

  render() {
    const {
      currentWordIndex,
      words,
      setCurrentWordIndex,
    } = this.props;

    return (
      words.length > 0 && (
      <View nativeID="words" style={styles.words}>
        <View style={[styles.button_left, currentWordIndex <= 0 && styles.button_disabled]}>
          <TouchableOpacity
            onPress={() => setCurrentWordIndex(currentWordIndex - 1)}
            disabled={currentWordIndex <= 0}
          >
            <Text style={styles.button_text}>‹</Text>
          </TouchableOpacity>
        </View>
        <ViewPagerAndroid
          style={styles.container}
          initialPage={currentWordIndex}
          removeClippedSubviews
          onPageSelected={(event) => {
            setCurrentWordIndex(event.nativeEvent.position);
          }}
          ref={(ref) => { this._pagerRef = ref; }}
        >
          {words.map((item, index) => (
            <View
              key={index}
              style={[styles.word_container, item.guessed && styles.word_guessed]}
            >
              <View style={styles.word}>
                <Text style={styles.word_text}>{item.word}</Text>
                <Text style={styles.word_text}>{item.translation}</Text>
              </View>
            </View>
          ))}
        </ViewPagerAndroid>

        <View style={[
          styles.button_right,
          currentWordIndex >= words.length - 1 && styles.button_disabled,
        ]}
        >
          <TouchableOpacity
            onPress={() => setCurrentWordIndex(currentWordIndex + 1)}
            disabled={currentWordIndex >= words.length - 1}
          >
            <Text style={styles.button_text}>›</Text>
          </TouchableOpacity>
        </View>
      </View>
      )
    );
  }
}

WordsView.propTypes = {
  currentWordIndex: PropTypes.number.isRequired,
  words: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.node,
    translation: PropTypes.node,
  })).isRequired,
  setCurrentWordIndex: PropTypes.func.isRequired,
};

export default WordsView;
