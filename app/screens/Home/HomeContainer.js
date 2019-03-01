import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeView from './HomeView';

class HomeContainer extends Component {
  render() {
    return <HomeView {...this.props} />;
  }
}

function mapStateToProps() {
  return {};
}
function mapDispatchToProps() {
  return {};
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer);
