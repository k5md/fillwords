import * as types from 'app/constants/actionTypes';

const initialState = {
    currentWordIndex: 0,
    words: [],
    connections: {},
    cells: [],
    selectedCells: [],
    gameState: 'setup' // learning | playing | end
};

const handlers = {
    [types.SET_CURRENT_WORD_INDEX]: (state, action) => ({ ...state, currentWordIndex: action.index }),
    [types.SET_CELLS]: (state, action) => ({ ...state, cells: action.cells }),
    [types.SET_CONNECTIONS]: (state, action) => ({ ...state, connections: action.connections }),
    [types.SET_WORDS]: (state, action) => ({ ...state, words: action.words }),
    [types.SET_SELECTED_CELLS]: (state, action) => ({ ...state, selectedCells: action.selectedCells }),
    [types.SETUP_GAME]: (state, action) => ({ ...state, ...action.config, gameState: 'learning' }),
    [types.SELECT_CELL]: (state, action) => {
        const cellToSelect = action.cell;
        return {
            ...state,
            cells: state.cells.map(cell => cellToSelect.row === cell.row && cellToSelect.col === cell.col ? ({...cell, selected: true}) : cell),
            selectedCells: [...state.selectedCells, {row: cellToSelect.row, col: cellToSelect.col}], //add check here for already existing
        };
    },
    [types.SELECT_CELL_BY_INDEX]: (state, action) => {
        return {
            ...state,
            cells: state.cells.map((cell, index) => action.cellIndex === index ? ({...cell, selected: true}) : cell),
            selectedCells: [...state.selectedCells, action.cellIndex], //add check here for already existing
        };
    },    
    [types.DESELECT_CELLS]: (state, action) => {
        return {
            ...state,
            cells: state.cells.map(cell => cell.selected ? ({...cell, selected: false}) : cell),
            selectedCells: [],
        };
    },
    [types.GUESS_WORD]: (state, action) => {
        const words = state.words.map((item, idx) => idx === state.currentWordIndex ? ({...item, guessed: true}) : item);
        const gameState = words.every(word => word.guessed) ? 'end' : state.gameState;
        const nextWordIndex = words.findIndex(word => !word.guessed);
        const currentWordIndex = nextWordIndex !== -1 ? nextWordIndex : state.currentWordIndex;
        return {
            ...state,
            words,
            cells: state.cells.map((cell, idx) => state.selectedCells.includes(idx) ? ({...cell, flipped: true}) : cell),
            gameState,
            currentWordIndex,
        };             
    },
    [types.PLAY_GAME]: (state, action) => {
        return {
            ...state,
            gameState: 'playing',
        }
    },
    [types.CLEAR_GAME]: (state, action) => {
        return {
            ...initialState,
        };
    }
}

export const gameReducer = function(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action);
    }
    return state; 
}
