import React from 'react';
import { connect } from 'react-redux';
import * as gameActions from '../../actions/gameActions';
import GameEndView from './GameEndView';

const GameEndContainer = props => (<GameEndView {...props} />);

const mapStateToProps = state => ({
  words: state.gameReducer.words,
  isOpen: state.gameReducer.gameState === 'end',
});

const mapDispatchToProps = dispatch => ({
  clearGame: () => dispatch(gameActions.clearGame()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameEndContainer);
