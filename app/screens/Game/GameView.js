import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import Field from '../../lib/field';
import dictionary from '../../utils/Dictionaries';
import metrics from '../../config/metrics';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../../utils/androidBackButton';
import defer from '../../utils/deferredPromise';
import styles from './styles';
import images from '../../config/images';
import WordsContainer from './WordsContainer';
import FieldContainer from './FieldContainer';
import WordsPreviewContainer from './WordsPreviewContainer';
import GameEndContainer from './GameEndContainer';

class GameView extends Component {
  state = {
    header: defer(), // contains layout object after the view is mounted
  }

  async componentDidMount() {
    const {
      navigation,
      clearGame,
      setupGame,
      rows,
      cols,
    } = this.props;

    const { header } = this.state;

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
          srsStatus,
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
            srsStatus,
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

    const {
      layout: {
        x: x0,
        y: y0,
        width: headerWidth,
        height: headerHeight,
      },
    } = await header;

    // header takes fullWidth, absolute positioned,
    // so dx will be header's left property + width, it's >= screenWidth, set it to 0
    // same for dy
    const dx = (x0 + headerWidth) % width;
    const dy = (y0 + headerHeight) % height;

    const cells = [];
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const x = col * size + marginX + dx;
        const y = row * size + marginY + dy;
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

  measureHeader = (e) => {
    const { nativeEvent: { layout } } = e;
    const { header } = this.state;
    if (header) {
      this.setState({
        header: header.resolve({ layout }),
      });
    }
  }

  render() {
    const {
      navigation,
      clearGame,
    } = this.props;

    return (
      <View style={styles.container}>
        <FieldContainer />
        <View style={[styles.header]} onLayout={(e) => { this.measureHeader(e); }}>
          <View styles={styles.button_close}>
            <TouchableOpacity
              onPress={() => {
                clearGame();
                navigation.navigate('Home');
              }}
            >
              <SvgUri
                width="30"
                height="30"
                fill="#66CCFF"
                svgXmlData={images.icons.times}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.hairline} />
        <WordsContainer />
        <WordsPreviewContainer />
        <GameEndContainer {...{ navigation }} />
      </View>
    );
  }
}

export default GameView;
