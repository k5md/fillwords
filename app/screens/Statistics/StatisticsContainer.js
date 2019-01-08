import React, { Component } from 'react';
import StatisticsView from './StatisticsView';
import { connect } from 'react-redux';

class StatisticsContainer extends Component {
    constructor(props) {
        super(props);
    }    
    render() {
        return <StatisticsView {...this.props} />;
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

export default connect(
    mapStateToProps,
)(StatisticsContainer);