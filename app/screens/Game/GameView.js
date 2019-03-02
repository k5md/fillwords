import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import Field from '../../lib/field';
import dictionary from '../../utils/Dictionaries';
import metrics from '../../config/metrics';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../../utils/androidBackButton';
import styles from './styles';
import WordsContainer from './WordsContainer';
import FieldContainer from './FieldContainer';
import WordsPreviewContainer from './WordsPreviewContainer';
import GameEndContainer from './GameEndContainer';

class GameView extends Component {
  async componentDidMount() {
    const {
      navigation,
      clearGame,
      setupGame,
      rows,
      cols,
    } = this.props;

    handleAndroidBackButton(() => {
      navigation.navigate('Home');
      clearGame();
    });

    const field = new Field(cols, rows);
    field.initializeFast();
    // TODO: remove later, fix to depend on the dictionary chosen,
    // this is a temporary workaround to prevent creating fields with chains
    // longer than 14, since no such words may be present in the dictionary
    while (Object.values(field.connections).some(item => item.length >= 14)) {
      field.initializeFast();
    }

    // TODO: add where wordIsComposite
    const letters = new Map(); // used to map {row, col} to it's corresponding letter
    const words = await Promise.all(
      Object.keys(field.connections).map((key) => {
        const chain = field.connections[key];
        const wordPromise = dictionary.getWord({
          wordLength: chain.length,
        }).then(({
          wordLength,
          word,
          translation,
          translationLength,
        }) => {
          for (let i = 0; i < chain.length; i += 1) {
            const [row, col] = chain[i];
            const letter = word[i];
            letters.set(row * field.cols + col, letter);
          }

          return {
            key,
            wordLength,
            word,
            translation,
            translationLength,
            guessed: false,
          };
        });
        return wordPromise;
      }),
    );

    const height = metrics.screenHeight;
    const width = metrics.screenWidth;

    const size = Math.floor(Math.min(width / cols, height / rows));

    const marginX = Math.floor((width - (size * cols)) / (2 * cols));
    const marginY = Math.floor((height - (size * rows)) / (2 * rows));

    const cells = [];
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const x = col * size + marginX;
        const y = row * size + marginY;
        const value = letters.get(row * field.cols + col);

        cells.push({
          x,
          y,
          width: size,
          height: size,
          value,
          row,
          col,
          selected: false,
          flipped: false,
        });
      }
    }

    setupGame({
      cells,
      connections: field.connections,
      currentWordIndex: 0,
      selectedCells: [],
      words,
    });
  }

  componentWillUnmount() {
    removeAndroidBackButtonHandler();
  }

  render() {
    const {
      navigation,
    } = this.props;

    return (
      <View style={styles.container}>
        <FieldContainer />
        <View style={styles.hairline} />
        <WordsContainer />
        <WordsPreviewContainer />
        <GameEndContainer {...{ navigation }} />
      </View>
    );
  }
}

export default GameView;
