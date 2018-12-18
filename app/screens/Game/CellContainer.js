import React, { Component } from 'react';
import { connect } from 'react-redux';
import CellView from './CellView';

class CellContainer extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (<CellView {...this.props} />);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const oldCell = this.props.cell;
        const newCell = nextProps.cell;
        return (oldCell.flipped !== newCell.flipped) || (oldCell.selected !== newCell.selected);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        cell: state.gameReducer.cells[ownProps.cellIndex],
    };
};

export default connect(
    mapStateToProps
)(CellContainer);
