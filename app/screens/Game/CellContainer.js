import React, { Component } from 'react';
import { connect } from 'react-redux';
import CellView from './CellView';

class CellContainer extends Component {
  shouldComponentUpdate(nextProps) {
    const { cell: oldCell } = this.props;
    const newCell = nextProps.cell;
    return (oldCell.flipped !== newCell.flipped) || (oldCell.selected !== newCell.selected);
  }

  render() {
    return (<CellView {...this.props} />);
  }
}

const mapStateToProps = (state, ownProps) => ({
  cell: state.gameReducer.cells[ownProps.cellIndex],
});

export default connect(
  mapStateToProps,
)(CellContainer);
