import React, { Component } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import AppStyles from '../../config/styles';
import { StyleSheet } from 'react-native';

const { color, fontSizes } = AppStyles;

const styles = StyleSheet.create({
  cell: {
    alignItems: 'center',
    backgroundColor: color.COLOR_BLACK_TRANSP,
    borderColor: color.COLOR_BLACK_TRANSP,
    borderRadius: 3,
    borderWidth: 1,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  cell_backface: {},
  cell_container: {
    height: '100%',
    padding: 5,
    width: '100%',
  },
  cell_outer_container: {
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    flex: 0,
    justifyContent: 'center',
    position: 'absolute',
  },
  cell_selected: {
    backgroundColor: color.COLOR_BLUE_LIGHT,
  },
  cell_text: {
    color: color.COLOR_GREYISH,
    fontSize: fontSizes.FONT_SIZE_NORMAL,
  },
});

class CellView extends Component {
  state = {
    animatedValue: new Animated.Value(0),
  };

  componentWillReceiveProps(nextProps) {
    const {
      cell: { flipped: oldFlipped },
    } = this.props;
    const {
      cell: { flipped: newFlipped },
    } = nextProps;
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
      cell: { selected, value, y, x, width, height },
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
      transform: [{ rotateY: frontInterpolate }],
      opacity: frontOpacity,
    };
    const backAnimatedStyle = {
      transform: [{ rotateY: backInterpolate }],
      opacity: backOpacity,
    };

    return (
      <View>
        <Animated.View
          style={[
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
        <Animated.View
          style={[
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
        />
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
