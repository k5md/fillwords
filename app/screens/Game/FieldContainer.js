import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PanResponder } from 'react-native';
import FieldView from './FieldView';
import * as gameActions from 'app/actions/gameActions';

class FieldContainer extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (<FieldView {...this.props} />);
        //return (<FieldView {...{...this.props, ...this._panResponder.panHandlers}} />);
    }
}

const mapStateToProps = (state) => {
    return {
        cells: state.gameReducer.cells,
        connections: state.gameReducer.connections,
        selectedCells: state.gameReducer.selectedCells,
        words: state.gameReducer.words,
        currentWordIndex: state.gameReducer.currentWordIndex
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCells: (cells) => dispatch(gameActions.setCells(cells)),
        setConnections: (connections) => dispatch(gameActions.setConnections(connections)),
        setSelectedCells: (selectedCells) => dispatch(gameActions.setSelectedCells(selectedCells)),
        setWords: (words) => dispatch(gameActions.setWords(words)),
        selectCell: (cell) => dispatch(gameActions.selectCell(cell)),
        deselectCells: () => dispatch(gameActions.deselectCells()),
        guessWord: () => dispatch(gameActions.guessWord()),
        selectCellByIndex: (cellIndex) => dispatch(gameActions.selectCellByIndex(cellIndex)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FieldContainer);
