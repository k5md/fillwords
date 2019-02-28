/* eslint camelcase: ["error", {allow: ["^UNSAFE_"]}] */

import React, { Component } from 'react';
import {
  Button, Text, View, TouchableOpacity,
} from 'react-native';
import _ from 'lodash';

import Field from 'app/lib/field';
import dictionary from 'app/utils/Dictionaries';

import metrics from 'app/config/metrics';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from 'app/utils/androidBackButton';
import styles from './styles';
import WordsContainer from './WordsContainer';
import FieldContainer from './FieldContainer';
import WordsPreviewContainer from './WordsPreviewContainer';
import GameEndContainer from './GameEndContainer';


class GameView extends Component {
  async componentDidMount() {
    handleAndroidBackButton(() => {
      this.props.navigation.navigate('Home');
      this.props.clearGame();
    });

    const {
      setupGame,
    } = this.props;

    const { rows, cols } = this.props;
    const test = new Field(cols, rows);
    test.initializeFast();
    // NOTE THIS IS A TEMPORARY WORKAROUND! REMOVE LATER AND FIX
    while (Object.values(test.connections).some(item => item.length >= 14)) {
      test.initializeFast();
    }

    const height = metrics.screenHeight;
    const width = metrics.screenWidth;

    const size = Math.floor(Math.min(width / cols, height / rows));

    const marginX = Math.floor((width - (size * cols)) / (2 * cols));
    const marginY = Math.floor((height - (size * rows)) / (2 * rows));

    let cells = [];
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        // const height = metrics.screenHeight / rows - 2 * rows;
        const x = col * size + marginX;
        const y = row * size + marginY;
        const width = size;
        const height = size;
        const value = test.cells[row][col];
        cells.push({
          x, y, width, height, value, row, col, selected: false, flipped: false,
        });
      }
    }

    console.log('started retrieving words');
    const words = [];
    // TODO: add where wordIsComposite
    for (const key in test.connections) {
      const chain = test.connections[key];

      const results = await dictionary.getWord({
        wordLength: chain.length,
      });

      const {
        word, wordLength, translation, translationLength,
      } = results;
      for (let i = 0; i < chain.length; i += 1) {
        const targetRow = chain[i][0];
        const targetCol = chain[i][1];
        const letter = word[i];
        cells = cells.map(cell => (cell.row === targetRow && cell.col === targetCol ? ({ ...cell, value: letter }) : cell));
      }
      words.push({
        key, wordLength, word, translation, translationLength, guessed: false,
      });
    }
    console.log('done retrieving words');


    setupGame({
      cells,
      connections: test.connections,
      currentWordIndex: 0,
      selectedCells: [],
      words,
    });
  }

  componentWillUnmount() {
    removeAndroidBackButtonHandler();
  }

  render() {
    return (
      <View style={styles.container}>

        <FieldContainer />
        <View style={styles.hairline} />
        <WordsContainer />
        <WordsPreviewContainer />
        <GameEndContainer {...{ navigation: this.props.navigation }} />
      </View>
    );
  }
}

export default GameView;
