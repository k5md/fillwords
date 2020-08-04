import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const Footer = ({ title }) => (
  <View style={styles.container}>
    {title ? <Text style={styles.text}>{title}</Text> : null}
  </View>
);

Footer.propTypes = {
  title: PropTypes.string,
};

Footer.defaultProps = {
  title: '',
};

export default Footer;
