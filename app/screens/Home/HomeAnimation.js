/* eslint camelcase: ["error", {allow: ["^UNSAFE_"]}] */

import React, { Component } from 'react';
import { View, Animated, Text } from 'react-native';
import _ from 'lodash';
import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';
import raw from '../../assets/animationAssetWords.json';

const { screenHeight, screenWidth } = metrics;

const fontSize = Math.floor(screenHeight / 40);
const lettersPerLine = Math.ceil(screenWidth / fontSize);
const linesPerPage = Math.ceil(screenHeight / fontSize) + 13;
const lettersPerPage = lettersPerLine * linesPerPage;
const { words } = raw.reduce(
  (acc, cur) => {
    if (cur.length + acc.letters < lettersPerPage) {
      return { letters: acc.letters + cur.length, words: [...acc.words, cur] };
    }
    return acc;
  },
  { letters: 0, words: [] },
);

const arr = [];
for (let i = 0; i < words.length; i += 1) {
  arr.push(i);
}

const styles = StyleSheet.create({
  background: {
    alignItems: 'flex-start',
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
  },
});

class HomeAnimation extends Component {
  constructor() {
    super();
    this.animatedValue = []; // (new Array(100)).map((value, index) => new Animated.Value(0));
    arr.forEach(value => {
      this.animatedValue[value] = new Animated.Value(0.1);
    });
  }

  componentDidMount() {
    this.animate();
  }

  componentWillUnmount() {
    // console.log('unmounting homeview animation');
  }

  animate() {
    const samples = _.sampleSize(arr, 25);

    const fadeIn = samples.map(item =>
      Animated.timing(this.animatedValue[item], {
        toValue: 0.5,
        duration: 1500,
        useNativeDriver: true,
      }),
    );
    Animated.parallel(fadeIn).start(() => {
      const fadeOut = samples.map(item =>
        Animated.timing(this.animatedValue[item], {
          toValue: 0.1,
          duration: 1500,
          useNativeDriver: true,
        }),
      );
      Animated.parallel(fadeOut).start(() => this.animate());
    });
  }

  render() {
    return (
      <View style={styles.background} removeClippedSubviews>
        {words.map((item, index) => (
          <Animated.View
            key={String(index)}
            style={{
              opacity: this.animatedValue[index],
            }}
          >
            <Text style={{ fontSize }}>{item}</Text>
          </Animated.View>
        ))}
      </View>
    );
  }
}

export default HomeAnimation;
