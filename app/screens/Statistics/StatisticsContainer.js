import React from 'react';
import { connect } from 'react-redux';
import StatisticsView from './StatisticsView';

const StatisticsContainer = props => (<StatisticsView {...props} />);

function mapStateToProps(state) {
  return {
    rows: state.optionsReducer.rows,
    cols: state.optionsReducer.cols,
    languagePack: state.optionsReducer.languagePack,
  };
}

export default connect(
  mapStateToProps,
)(StatisticsContainer);
