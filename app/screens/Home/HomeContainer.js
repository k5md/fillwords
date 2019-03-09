import React from 'react';
import { connect } from 'react-redux';
import HomeView from './HomeView';

const HomeContainer = props => (<HomeView {...props} />);

function mapStateToProps(state) {
  return {
    isDBReady: state.optionsReducer.isDBReady,
  };
}
function mapDispatchToProps() {
  return {};
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer);
