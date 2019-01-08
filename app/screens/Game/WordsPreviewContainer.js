import React, { Component } from 'react';
import { Modal, Text, Button, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import * as gameActions from 'app/actions/gameActions';

class WordsPreviewContainer extends Component {
    render() {
        return (
                <View style={{
                    flex: 0,
                    backgroundColor: '#ffff00',
                    position: 'absolute',
                    top: 50,
                    left: 50,
                    height: 500,
                    width: 500,
                    borderRadius: 55,
                    opacity: 0.99
                }}>
                    <View>
                        <FlatList
                            data={this.props.words}
                            renderItem={({item}) => <Text>{`${item.word} - ${item.translation}`}</Text>}
                        />
                        <Button 
                            title='Got its!'
                            onPress={() => this.props.playGame()}
                        />
                    </View>
                </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        words: state.gameReducer.words,
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
