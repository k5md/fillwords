import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import firebase from 'react-native-firebase';
import SvgUri from 'react-native-svg-uri';
import Field from '../../lib/field';
import dictionary from '../../utils/Dictionaries';
import dictionariesConfig from '../../config/dictionaries';
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
    headerView: defer(), // contains layout object after the view is mounted
    wordsView: defer(),
    fieldWidth: 0,
    fieldHeight: 0,
  }

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

    const { minimumWordLength, maximumWordLength } = dictionariesConfig.DICTIONARIES[languagePack];

    const field = new Field(cols, rows);
    field.initializeFast();
    // TODO: remove later, fix to depend on the dictionary chosen,
    // this is a temporary workaround to prevent creating fields with chains
    // longer than 14, since no such words may be present in the dictionary
    while (Object.values(field.connections).some(
      item => item.length > maximumWordLength || item.length < minimumWordLength,
    )) {
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

    const {
      layout: {
        width: wordsWidth,
        height: wordsHeight,
      },
    } = await wordsView;

    const height = metrics.screenHeight - wordsHeight;
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
    } = await headerView;

    this.setState({ fieldHeight: height - headerHeight, fieldWidth: width })


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

  measureHeaderView = (e) => {
    const { nativeEvent: { layout } } = e;
    const { headerView } = this.state;
    if (headerView) {
      this.setState({
        headerView: headerView.resolve({ layout }),
      });
    }
  }

  measureWordsView = (e) => {
    const { nativeEvent: { layout } } = e;
    const { wordsView } = this.state;
    if (wordsView) {
      this.setState({
        wordsView: wordsView.resolve({ layout }),
      });
    }
  }

  render() {
    const {
      navigation,
      clearGame,
    } = this.props;

    const { Banner, AdRequest } = firebase.admob;
    const request = new AdRequest();

    return (
      <View style={styles.container}>
        <View style={styles.header} onLayout={(e) => { this.measureHeaderView(e); }}>
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
        <FieldContainer fieldStyle={{width: this.state.fieldWidth, height: this.state.fieldHeight}}/>
        {__DEV__ ? null : (
          <Banner
            unitId="ca-app-pub-1059497387348503/9478393171"
            size="SMART_BANNER"
            request={request.build()}
            onAdLoaded={() => {
              console.log('Advert loaded');
            }}
          />
        )}
        <View style={styles.hairline} />
        <View onLayout={(e) => { console.log(e); this.measureWordsView(e); }} style={styles.container}>
          <WordsContainer />
        </View>

        <WordsPreviewContainer />
        <GameEndContainer {...{ navigation }} />
      </View>
    );
  }
}

export default GameView;
