import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modalbox';
import styles from './styles';

class GameEndView extends Component {
  render() {
    const {
      isOpen,
    } = this.props;
    const self = this;
    return (
      <Modal
        onClosed={() => {
          // console.log(self, self.props);
          self.props.clearGame();
          self.props.navigation.navigate('Home');
        }}
        isOpen={isOpen}
        style={styles.game_end_container}
        position="top"
        ref="modal6"
        swipeArea={20}
      >
        <View>
          <View style={styles.words_preview_title}>
            <Text style={styles.words_preview_title_text}>Congratulations!</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

GameEndView.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default GameEndView;
