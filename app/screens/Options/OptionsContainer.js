import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as optionsActions from '../../actions/optionsActions';
import OptionsView from './OptionsView';

class OptionsContainer extends Component {
  render() {
    return <OptionsView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    rows: state.optionsReducer.rows,
    cols: state.optionsReducer.cols,
    practiceBothway: state.optionsReducer.practiceBothway,
    languagePack: state.optionsReducer.languagePack,
  };
}

const mapDispatchToProps = dispatch => ({
  changeNumberRows: rows => dispatch(optionsActions.changeNumberRows(rows)),
  changeNumberCols: cols => dispatch(optionsActions.changeNumberCols(cols)),
  togglePracticeBothway: () => dispatch(optionsActions.togglePracticeBothway()),
  setLanguagePack: languagePack => dispatch(optionsActions.setLanguagePack(languagePack)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OptionsContainer);
