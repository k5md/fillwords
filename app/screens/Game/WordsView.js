/* eslint no-underscore-dangle: ["error", { "allow": ["_pagerRef"] }] */
/* eslint "react-native/split-platform-components": 1 */
/* eslint "react/no-array-index-key": 0 */

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  // ViewPagerAndroid
} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import PropTypes from 'prop-types';
import AppStyles from '../../config/styles';
import { StyleSheet } from 'react-native';

const { color, fontSizes } = AppStyles;

const styles = StyleSheet.create({
  button_disabled: {
    opacity: 0,
  },
  button_left: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
    opacity: 0.7,
  },
  button_right: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
    opacity: 0.7,
  },
  button_text: {
    lineHeight: fontSizes.FONT_SIZE_LARGE,
    fontSize: fontSizes.FONT_SIZE_LARGE, // 70,
    color: color.COLOR_BLACK_TRANSP,
  },
  container: {
    flex: 1,
  },
  word: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  word_container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  word_text: {
    fontSize: fontSizes.FONT_SIZE_SMALL, // fontSize / 2,
  },
  words: {
    backgroundColor: color.COLOR_GREYISH,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

class WordsView extends Component {
  componentDidUpdate(prevProps) {
    const { currentWordIndex: newCurrentWordIndex } = this.props;
    const { currentWordIndex: oldCurrentWordIndex } = prevProps;
    if (oldCurrentWordIndex !== newCurrentWordIndex && this._pagerRef) {
      this._pagerRef.setPage(newCurrentWordIndex);
    }
  }

  render() {
    const {
      currentWordIndex,
      words,
      discardWord,
      setCurrentWordIndex,
      onLayout,
    } = this.props;

    return (
      words.length > 0 && (
        <View nativeID="words" style={styles.words} onLayout={onLayout}>
          <View
            style={[
              styles.button_left,
              currentWordIndex <= 0 && styles.button_disabled,
            ]}
          >
            <TouchableOpacity
              onPress={() => setCurrentWordIndex(currentWordIndex - 1)}
              disabled={currentWordIndex <= 0}
            >
              <Text style={styles.button_text}>‹</Text>
            </TouchableOpacity>
          </View>
          <ViewPager
            style={styles.container}
            initialPage={currentWordIndex}
            removeClippedSubviews
            onPageSelected={event => {
              setCurrentWordIndex(event.nativeEvent.position);
            }}
            ref={ref => {
              this._pagerRef = ref;
            }}
          >
            {words.map((item, index) => (
              <View key={index} style={styles.word_container}>
                <TouchableOpacity
                  onLongPress={() => !item.guessed && discardWord(index)}
                >
                  <View style={styles.word}>
                    {item.guessed && <Text style={styles.word_text}>✓</Text>}
                    {item.discarded && <Text style={styles.word_text}>✗</Text>}
                    <Text style={styles.word_text}>{item.translation}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ViewPager>

          <View
            style={[
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
  words: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.node,
      translation: PropTypes.node,
    }),
  ).isRequired,
  setCurrentWordIndex: PropTypes.func.isRequired,
  discardWord: PropTypes.func.isRequired,
  onLayout: PropTypes.func,
};

WordsView.defaultProps = {
  onLayout: () => {},
};

export default WordsView;
