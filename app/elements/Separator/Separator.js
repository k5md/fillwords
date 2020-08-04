import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const Separator = ({ color, ...rest }) => (
  <View style={[styles.container, color && { borderColor: color }]} {...rest} />
);

Separator.propTypes = {
  color: PropTypes.string,
};

export default Separator;
