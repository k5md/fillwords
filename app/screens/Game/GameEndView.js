import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modalbox';
import styles from './styles';

const GameEndView = ({
  clearGame,
  navigation,
  isOpen,
}) => (
  <Modal
    onClosed={() => {
      // console.log(self, self.props);
      clearGame();
      navigation.navigate('Home');
    }}
    isOpen={isOpen}
    style={styles.game_end_container}
    position="top"
    swipeArea={20}
  >
    <View>
      <View style={styles.words_preview_title}>
        <Text style={styles.words_preview_title_text}>Congratulations!</Text>
      </View>
    </View>
  </Modal>
);


GameEndView.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  clearGame: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default GameEndView;
