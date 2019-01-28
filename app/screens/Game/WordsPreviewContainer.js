import React, { Component } from 'react';
import { Text, Button, View, FlatList, ScrollView, StyleSheet } from 'react-native';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';
import * as gameActions from 'app/actions/gameActions';

class WordsPreviewContainer extends Component {
    render() {
        return (
            <Modal
                onClosed={() => this.props.playGame()}
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
                        <Text>Please, remember the following pairs:</Text>
                    </View>
                    <ScrollView>
                        
                            {this.props.words.map((item, index) => <View key={index} ><Text>{`${item.word} - ${item.translation}`}</Text></View>)}
                        
                    </ScrollView>
                    <Button 
                        title='Got it!'
                        onPress={() => this.props.playGame()}
                    />
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        words: state.gameReducer.words,
        isOpen: state.gameReducer.gameState === 'learning',
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        playGame: () => dispatch(gameActions.playGame()),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WordsPreviewContainer);
