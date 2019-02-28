import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as gameActions from 'app/actions/gameActions';
import GameEndView from './GameEndView';

class GameEndContainer extends Component {
  constructor(props) {
    super(props);
  }

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
