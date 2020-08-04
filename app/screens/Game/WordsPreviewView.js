import React, { Component } from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Modal } from '../../elements';
import _ from 'lodash';
import { translate } from '../../localizations';
import AppStyles from '../../config/styles';
import { StyleSheet } from 'react-native';

const { color, fontSizes } = AppStyles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
        title={translate('remember')}
      >
        <ScrollView style={styles.content_container}>
          {words.map(item => (
            <View key={_.uniqueId()} style={styles.content_entry}>
              <View style={styles.content}>
                <Text style={styles.content_entry_text}>
                  {item.translation}
                </Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.content_entry_text}>{item.word}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={() => playGame()}
          disabled={buttonCountdownTime > 0}
        >
          <View style={styles.button}>
            <Text style={styles.button_text}>
              {buttonCountdownTime > 0
                ? buttonCountdownTime / 1000
                : translate('done')}
            </Text>
          </View>
        </TouchableOpacity>
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
