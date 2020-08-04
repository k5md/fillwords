import React from 'react';
import { View } from 'react-native';
import styles from './styles';

const Separator = ({ color, ...rest }) => (
  <View
    style={[styles.container, color ? { borderColor: color } : {}]}
    {...rest}
  />
);

export default Separator;
