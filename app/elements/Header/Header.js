import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import PropTypes from 'prop-types';
import images from '../../config/images';
import styles from './styles';

const Header = ({ title, onClose, ...rest }) => (
  <View style={styles.container} {...rest}>
    <View style={styles.text_container}>
      <Text style={styles.text}>{title}</Text>
    </View>
    <TouchableOpacity onPress={onClose}>
      <SvgXml width="30" height="30" fill="#66CCFF" xml={images.icons.times} />
    </TouchableOpacity>
  </View>
);

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps = {
  title: '',
};

export default Header;
