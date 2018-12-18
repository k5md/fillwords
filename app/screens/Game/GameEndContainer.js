import React, { Component } from 'react';
import { Modal, Text, Button, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import * as gameActions from 'app/actions/gameActions';

class WordsPreviewContainer extends Component {
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.gameState === 'end'}
                onRequestClose={() => console.log('requested close')}>
                <View style={{
                    flex: 0,
                    backgroundColor: '#ffff00',
                    position: 'absolute',
                    top: 50,
                    left: 50,
                    height: 500,
                    width: 500,
                }}>
                    <View>
                        <FlatList
                            data={this.props.words}
                            renderItem={({item}) => <Text>{`${item.word} - ${item.translation}`}</Text>}
                        />
                        <Button 
                            title='Got it!'
                            onPress={() => this.props.playGame()}
                        />
                    </View>
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        gameState: state.gameReducer.gameState
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
