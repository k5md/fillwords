import React from 'react';
import { connect } from 'react-redux';
import * as optionsActions from '../../actions/optionsActions';
import OptionsView from './OptionsView';

const OptionsContainer = props => (<OptionsView {...props} />);

function mapStateToProps(state) {
  return {
    rows: state.optionsReducer.rows,
    cols: state.optionsReducer.cols,
    languagePack: state.optionsReducer.languagePack,
  };
}

const mapDispatchToProps = dispatch => ({
  changeNumberRows: rows => dispatch(optionsActions.changeNumberRows(rows)),
  changeNumberCols: cols => dispatch(optionsActions.changeNumberCols(cols)),
  setLanguagePack: languagePack => dispatch(optionsActions.setLanguagePack(languagePack)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OptionsContainer);
