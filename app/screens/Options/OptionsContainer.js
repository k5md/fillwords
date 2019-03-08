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
    showHelp: state.optionsReducer.showHelp,
  };
}

const mapDispatchToProps = dispatch => ({
  changeNumberRows: rows => dispatch(optionsActions.changeNumberRows(rows)),
  changeNumberCols: cols => dispatch(optionsActions.changeNumberCols(cols)),
  setLanguagePack: languagePack => dispatch(optionsActions.setLanguagePack(languagePack)),
  toggleShowHelp: () => dispatch(optionsActions.toggleShowHelp()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OptionsContainer);
