import React, { Component } from 'react';
import { Text, Button, View, FlatList, ScrollView, StyleSheet } from 'react-native';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';
import * as gameActions from 'app/actions/gameActions';

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
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '15%',
                    height: '80%',
                    width: '80%',
                    border: 1,
                    borderRadius: 5,
                }}
                position={"top"} 
                ref={"modal6"} 
                swipeArea={20}
            >
                <View>
                    <View>
                        <Text>Game fucking over</Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default GameEndView;