import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as gameActions from 'app/actions/gameActions';
import WordsView from './WordsView';

class WordsContainer extends Component {
  render() {
    return (<WordsView {...this.props} />);
  }
}

function mapStateToProps(state) {
  return {
    words: state.gameReducer.words,
    currentWordIndex: state.gameReducer.currentWordIndex,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setCurrentWordIndex: index => dispatch(gameActions.setCurrentWordIndex(index)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WordsContainer);
