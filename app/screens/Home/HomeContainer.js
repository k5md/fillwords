import React from 'react';
import { connect } from 'react-redux';
import HomeView from './HomeView';

class HomeContainer extends React.Component {
  render() {
    return <HomeView {...this.props} />;
  }
}

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
