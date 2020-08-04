import React, { Component } from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modalbox';
import _ from 'lodash';
import styles from './styles';
import { translate } from '../../localizations';

const initialCountdownTime = 30000;
const tick = 1000;

class WordsPreviewView extends Component {
  state = {
    buttonCountdownTime: initialCountdownTime,
    buttonCountdownIntervalHandle: null,
  };

  componentWillReceiveProps(nextProps) {
    const { words } = nextProps;
    const { buttonCountdownIntervalHandle: intervalHandle } = this.state;

    // do nothing if interval is already set or if words array is empty
    if (words.length === 0 || intervalHandle) {
      return;
    }

    // calculate time to learn the words based on the amount of them
    const countdownTime = words.length * tick;
    this.setState({ buttonCountdownTime: countdownTime });

    // set the interval that decrements buttonCountdownTime on each tick
    const newIntervalHandle = setInterval(() => {
      const { buttonCountdownTime, buttonCountdownIntervalHandle } = this.state;

      if (buttonCountdownTime < 0) {
        clearInterval(buttonCountdownIntervalHandle);
        return;
      }

      this.setState({ buttonCountdownTime: buttonCountdownTime - tick });
    }, tick);

    this.setState({ buttonCountdownIntervalHandle: newIntervalHandle });
  }

  componentWillUnmount() {
    const { buttonCountdownIntervalHandle } = this.state;
    if (buttonCountdownIntervalHandle) {
      clearInterval(buttonCountdownIntervalHandle);
    }
  }

  render() {
    const { playGame, isOpen, words } = this.props;

    const { buttonCountdownTime } = this.state;

    return (
      <Modal
        onClosed={() => playGame()}
        isOpen={isOpen}
        style={styles.container}
        position="top"
        backdropPressToClose={false}
        swipeArea={20}
      >
        <View style={styles.words_preview_container}>
          <View style={styles.words_preview_title}>
            <Text style={styles.words_preview_title_text}>
              {translate('remember')}
            </Text>
          </View>
          <View style={styles.words_preview_title_hairline} />
          <ScrollView style={styles.words_preview_content_container}>
            {words.map(item => (
              <View
                key={_.uniqueId()}
                style={styles.words_preview_content_entry}
              >
                <View style={styles.words_preview_content}>
                  <Text style={styles.words_preview_content_entry_text}>
                    {item.translation}
                  </Text>
                </View>
                <View style={styles.words_preview_content}>
                  <Text style={styles.words_preview_content_entry_text}>
                    {item.word}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity
            onPress={() => playGame()}
            disabled={buttonCountdownTime > 0}
            style={styles.words_preview_button}
          >
            <View >
              <Text style={styles.words_preview_button_text}>
                {buttonCountdownTime > 0
                  ? buttonCountdownTime / 1000
                  : translate('done')}
              </Text>
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
