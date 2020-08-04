import React from 'react';
import { connect } from 'react-redux';
import StatisticsView from './StatisticsView';

class StatisticsContainer extends React.Component {
  render() {
    return <StatisticsView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    rows: state.optionsReducer.rows,
    cols: state.optionsReducer.cols,
    languagePack: state.optionsReducer.languagePack,
  };
}

export default connect(mapStateToProps)(StatisticsContainer);
