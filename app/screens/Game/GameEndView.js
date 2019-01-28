import React, { Component } from 'react';
import { Text, Button, View, FlatList, ScrollView, StyleSheet } from 'react-native';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';
import * as gameActions from 'app/actions/gameActions';
import styles from './styles';
class GameEndView extends Component {
    render() {
        const self = this;
        return (
            <Modal
                onClosed={() => {
                    console.log(self, self.props)
                    self.props.clearGame();
                    self.props.navigation.navigate('Home');     
                }}
                isOpen={this.props.isOpen} 
                style={styles.game_end_container}
                position={"top"} 
                ref={"modal6"} 
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

export default GameEndView;