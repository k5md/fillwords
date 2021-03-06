import React, { Component } from 'react';
import { View } from 'react-native';
import Field from '../../lib/field';
import dictionary from '../../utils/Dictionaries';
import dictionariesConfig from '../../config/dictionaries';
import metrics from '../../config/metrics';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from '../../utils/androidBackButton';
import defer from '../../utils/deferredPromise';
import WordsContainer from './WordsContainer';
import FieldContainer from './FieldContainer';
import WordsPreviewContainer from './WordsPreviewContainer';
import GameEndContainer from './GameEndContainer';
import { StyleSheet } from 'react-native';
import AppStyles from '../../config/styles';
import { Header, Separator } from '../../elements';

const { color, fontSizes } = AppStyles;

const styles = StyleSheet.create({
  button_close: {
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
  },
});

class GameView extends Component {
  state = {
    headerView: defer(), // contains layout object after the view is mounted
    wordsView: defer(),
  };

  fieldWidth = 0;
  fieldHeight = 0;

  async componentDidMount() {
    const {
      navigation,
      clearGame,
      setupGame,
      rows,
      cols,
      languagePack,
    } = this.props;

    const { headerView, wordsView } = this.state;

    handleAndroidBackButton(() => {
      navigation.navigate('Home');
      clearGame();
    });

    const {
      minimumWordLength,
      maximumWordLength,
    } = dictionariesConfig.DICTIONARIES[languagePack];

    const field = new Field(cols, rows);
    field.initializeFast();
    // TODO: remove later, fix to depend on the dictionary chosen,
    // this is a temporary workaround to prevent creating fields with chains
    // longer than 14, since no such words may be present in the dictionary
    while (
      Object.values(field.connections).some(
        item =>
          item.length > maximumWordLength || item.length < minimumWordLength,
      )
    ) {
      field.initializeFast();
    }

    // TODO: add where wordIsComposite
    const letters = new Map(); // used to map {row, col} to it's corresponding letter
    const words = await Promise.all(
      Object.keys(field.connections).map(key => {
        const chain = field.connections[key];
        const wordPromise = dictionary
          .getWord({
            wordLength: chain.length,
          })
          .then(({ wordLength, word, translation, srsStatus }) => {
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
              srsStatus,
            };
          });
        return wordPromise;
      }),
    );

    const {
      layout: { height: wordsHeight },
    } = await wordsView;

    const {
      layout: { height: headerHeight },
    } = await headerView;

    const height = metrics.screenHeight - headerHeight - wordsHeight;
    const width = metrics.screenWidth;

    const size = Math.floor(Math.min(width / (cols + 1), height / (rows + 1)));

    const marginX = Math.floor((width - size * cols) / 2);
    const marginY = Math.floor((height - size * rows) / 2);

    this.fieldHeight = height;
    this.fieldWidth = width;

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
          discarded: false,
          guessed: false,
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

  measureHeaderView = ({ nativeEvent: { layout } }) => {
    const { headerView } = this.state;
    if (!headerView) {
      return;
    }
    this.setState({ headerView: headerView.resolve({ layout }) });
  };

  measureWordsView = ({ nativeEvent: { layout } }) => {
    const { wordsView } = this.state;
    if (!wordsView) {
      return;
    }
    this.setState({ wordsView: wordsView.resolve({ layout }) });
  };

  render() {
    const { navigation, clearGame } = this.props;

    // const { Banner, AdRequest } = firebase.admob;
    // const request = new AdRequest();

    return (
      <View style={styles.container}>
        <Header
          onClose={() => {
            clearGame();
            navigation.navigate('Home');
          }}
          onLayout={this.measureHeaderView}
        />
        <FieldContainer
          fieldStyle={{
            width: this.fieldWidth,
            height: this.fieldHeight,
          }}
        />

        <View onLayout={this.measureWordsView} style={styles.container}>
          <WordsContainer />
        </View>

        <WordsPreviewContainer />
        <GameEndContainer {...{ navigation }} />
      </View>
    );
  }
}

export default GameView;
