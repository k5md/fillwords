import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as gameActions from '../../actions/gameActions';
import WordsPreviewView from './WordsPreviewView';

class WordsPreviewContainer extends Component {
  render() {
    return (<WordsPreviewView {...this.props} />);
  }
}

const mapStateToProps = state => ({
  words: state.gameReducer.words,
  isOpen: state.gameReducer.gameState === 'learning',
});

const mapDispatchToProps = dispatch => ({
  playGame: () => dispatch(gameActions.playGame()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WordsPreviewContainer);
