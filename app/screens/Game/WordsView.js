import React, { Component } from 'react';
import {
  View, Text, ViewPagerAndroid, TouchableOpacity,
} from 'react-native';

import styles from './styles';

class WordsView extends Component {
  componentDidUpdate({ currentWordIndex }) {
    if (this.props.currentWordIndex !== currentWordIndex && this._pagerRef) {
      this._pagerRef.setPage(this.props.currentWordIndex);
    }
  }

  render() {
    const {
      currentWordIndex,
      words,
      setCurrentWordIndex,
    } = this.props;
    console.log(this.props.words, this.props.currentWordIndex);
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
          ref={ref => this._pagerRef = ref}
        >

          {words.map((item, idx) => (
            <View
              key={idx}
              style={[styles.word_container, item.guessed && styles.word_guessed]}
            >
              <View style={styles.word}>
                <Text style={styles.word_text}>{item.word}</Text>
                <Text style={styles.word_text}>{item.translation}</Text>
              </View>
            </View>
          ))}
        </ViewPagerAndroid>

        <View style={[styles.button_right, currentWordIndex >= words.length - 1 && styles.button_disabled]}>
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

export default WordsView;
