import React, { Component } from 'react';
import { Text, Button, TouchableOpacity, View, FlatList, ScrollView, StyleSheet } from 'react-native';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';
import * as gameActions from 'app/actions/gameActions';
import styles from './styles';

class WordsPreviewContainer extends Component {
    render() {
        return (
            <Modal
                onClosed={() => this.props.playGame()}
                isOpen={this.props.isOpen} 
                style={styles.words_preview_container}
                position={"top"} 

                swipeArea={20}
            >
                <View>
                    <View style={styles.words_preview_title}>
                        <Text style={styles.words_preview_title_text}>Remember:</Text>
                    </View>
                    <View style={styles.words_preview_title_hairline} />
                    <ScrollView >
                        {this.props.words.map((item, index) => 
                            <View key={index} style={styles.words_preview_content_entry}>
                                <Text style={styles.words_preview_content_entry_text}>{item.word}</Text>
                                <Text style={styles.words_preview_content_entry_text}>{item.translation}</Text>
                            </View>)
                        }
                    </ScrollView>
                    <TouchableOpacity onPress={() => this.props.playGame()}>
                        <View style={styles.words_preview_button}>
                            <Text style={styles.words_preview_button_text}>Done!</Text>
                        </View>
                    </TouchableOpacity>
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
