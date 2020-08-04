import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import ModalBox from 'react-native-modalbox';
import { Separator } from '../';
import styles from './styles';

const Modal = ({
  isOpen,
  onClosed,
  onOpened,
  modalStyle,
  containerStyle,
  contentStyle,
  title,
  children,
}) => (
  <ModalBox
    onClosed={onClosed}
    isOpen={isOpen}
    onOpened={onOpened}
    style={[styles.modal, modalStyle]}
    position="top"
    swipeArea={20}
  >
    <View style={[styles.container, containerStyle]}>
      <View style={styles.title}>
        <Text style={styles.title_text}>{title}</Text>
      </View>
      <Separator style={styles.hairline} />
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  </ModalBox>
);

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClosed: PropTypes.func,
  onOpened: PropTypes.func,
  modalStyle: PropTypes.object,
  contentStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  title: PropTypes.string.isRequired,
};

Modal.defaultProps = {
  onClosed: () => {},
  onOpened: () => {},
  modalStyle: {},
  contentStyle: {},
  containerStyle: {},
};

export default Modal;
