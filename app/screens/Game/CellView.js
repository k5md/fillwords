import React, { Component } from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

class CellView extends Component {
    state = {
      animatedValue: new Animated.Value(0),
    }

    componentWillReceiveProps(nextProps) {
      const { cell: { flipped: oldFlipped } } = this.props;
      const { cell: { flipped: newFlipped } } = nextProps;
      const { animatedValue } = this.state;

      if (oldFlipped !== newFlipped) {
        Animated.timing(animatedValue, {
          toValue: 180,
          duration: 300,
          easing: Easing.bounce,
          useNativeDriver: true,
        }).start();
      }
    }

    render() {
      const {
        cell: {
          selected,
          value,
          y,
          x,
          width,
          height,
        },
      } = this.props;

      const { animatedValue } = this.state;

      const frontInterpolate = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
      });
      const backInterpolate = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg'],
      });

      const frontOpacity = animatedValue.interpolate({
        inputRange: [89, 90],
        outputRange: [1, 0],
      });
      const backOpacity = animatedValue.interpolate({
        inputRange: [89, 90],
        outputRange: [0, 1],
      });

      const frontAnimatedStyle = {
        transform: [
          { rotateY: frontInterpolate },
        ],
        opacity: frontOpacity,
      };
      const backAnimatedStyle = {
        transform: [
          { rotateY: backInterpolate },
        ],
        opacity: backOpacity,
      };

      return (
        <View>
          <Animated.View style={[
            frontAnimatedStyle,
            styles.cell_outer_container,
            selected && styles.cell_selected,
            {
              top: y,
              left: x,
              width,
              height,
            },
          ]}
          >
            <View style={styles.cell_container}>
              <View style={styles.cell}>
                <Text style={styles.cell_text}>{value}</Text>
              </View>
            </View>
          </Animated.View>
          <Animated.View style={[
            backAnimatedStyle,
            styles.cell_outer_container,
            styles.cell_backface,
            {
              top: y,
              left: x,
              width,
              height,
            },
          ]}
          >
          </Animated.View>
        </View>
      );
    }
}

CellView.propTypes = {
  cell: PropTypes.shape({
    selected: PropTypes.bool,
    flipped: PropTypes.bool,
    value: PropTypes.string,
    y: PropTypes.number,
    x: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
};

export default CellView;
