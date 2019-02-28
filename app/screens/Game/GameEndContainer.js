import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as gameActions from '../../actions/gameActions';
import GameEndView from './GameEndView';

class GameEndContainer extends Component {
  render() {
    return (<GameEndView {...this.props} />);
  }
}

const mapStateToProps = state => ({
  isOpen: state.gameReducer.gameState === 'end',
});

const mapDispatchToProps = dispatch => ({
  clearGame: () => dispatch(gameActions.clearGame()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameEndContainer);
