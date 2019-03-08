import React from 'react';
import { connect } from 'react-redux';
import * as optionsActions from '../../actions/optionsActions';
import HelpView from './HelpView';

const HelpContainer = props => (<HelpView {...props} />);

function mapStateToProps(state) {
  return {
    showHelp: state.optionsReducer.showHelp,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleShowHelp: () => dispatch(optionsActions.toggleShowHelp()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HelpContainer);
