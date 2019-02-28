import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as gameActions from '../../actions/gameActions';
import FieldView from './FieldView';

class FieldContainer extends Component {
  render() {
    return (<FieldView {...this.props} />);
  }
}

const mapStateToProps = state => ({
  cells: state.gameReducer.cells,
  connections: state.gameReducer.connections,
  selectedCells: state.gameReducer.selectedCells,
  words: state.gameReducer.words,
  currentWordIndex: state.gameReducer.currentWordIndex,
});

const mapDispatchToProps = dispatch => ({
  setCells: cells => dispatch(gameActions.setCells(cells)),
  setConnections: connections => dispatch(gameActions.setConnections(connections)),
  setSelectedCells: selectedCells => dispatch(gameActions.setSelectedCells(selectedCells)),
  setWords: words => dispatch(gameActions.setWords(words)),
  selectCell: cellIndex => dispatch(gameActions.selectCell(cellIndex)),
  deselectCells: () => dispatch(gameActions.deselectCells()),
  guessWord: () => dispatch(gameActions.guessWord()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FieldContainer);
