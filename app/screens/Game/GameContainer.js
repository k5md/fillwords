import React, { Component } from 'react';
import GameView from './GameView';
import { connect } from 'react-redux';
import * as gameActions from 'app/actions/gameActions';

class GameContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<GameView {...this.props} />);
    }
}

function mapStateToProps(state) {
    return {
        rows: state.optionsReducer.rows,
        cols: state.optionsReducer.cols,
        cells: state.gameReducer.cells,
        connections: state.gameReducer.connections,
        selectedCells: state.gameReducer.selectedCells,
        words: state.gameReducer.words,
        gameState: state.gameReducer.gameState,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        setCells: (cells) => dispatch(gameActions.setCells(cells)),
        setConnections: (connections) => dispatch(gameActions.setConnections(connections)),
        setSelectedCells: (selectedCells) => dispatch(gameActions.setSelectedCells(selectedCells)),
        setWords: (words) => dispatch(gameActions.setWords(words)),
        setCurrentWordIndex: (index) => dispatch(gameActions.setCurrentWordIndex(index)),
        setupGame: (config) => dispatch(gameActions.setupGame(config)),
        clearGame: () => dispatch(gameActions.clearGame()),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameContainer);