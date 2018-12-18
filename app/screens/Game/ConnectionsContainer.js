import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConnectionsView from './ConnectionsView';

class ConnectionsContainer extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (<ConnectionsView {...this.props} />);
    }
}

const mapStateToProps = (state) => {
    return {
        cells: state.gameReducer.cells,
        connections: state.gameReducer.connections,
    };
};

export default connect(
    mapStateToProps
)(ConnectionsContainer);
