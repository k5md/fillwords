import React from 'react';
import { connect } from 'react-redux';
import * as gameActions from '../../actions/gameActions';
import WordsView from './WordsView';

const WordsContainer = props => <WordsView {...props} />;

function mapStateToProps(state) {
  return {
    words: state.gameReducer.words,
    currentWordIndex: state.gameReducer.currentWordIndex,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    discardWord: index => dispatch(gameActions.discardWord(index)),
    setCurrentWordIndex: index =>
      dispatch(gameActions.setCurrentWordIndex(index)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WordsContainer);
