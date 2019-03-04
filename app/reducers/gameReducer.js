import * as types from '../constants/actionTypes';

const initialState = {
  currentWordIndex: 0,
  words: [],
  connections: {},
  cells: [],
  selectedCells: [],
  gameState: 'setup', // learning | playing | end
};

const handlers = {
  [types.SET_CURRENT_WORD_INDEX]:
    (state, action) => ({ ...state, currentWordIndex: action.index }),

  [types.SET_CELLS]:
    (state, action) => ({ ...state, cells: action.cells }),

  [types.SET_CONNECTIONS]:
    (state, action) => ({ ...state, connections: action.connections }),

  [types.SET_WORDS]:
    (state, action) => ({ ...state, words: action.words }),

  [types.SET_SELECTED_CELLS]:
    (state, action) => ({ ...state, selectedCells: action.selectedCells }),

  [types.SETUP_GAME]:
    (state, action) => ({ ...state, ...action.config, gameState: 'learning' }),

  [types.SELECT_CELL]: (state, action) => {
    // TODO: add check here for already existing selected cells
    const cells = state.cells.map(
      (cell, index) => (action.cellIndex === index ? ({ ...cell, selected: true }) : cell),
    );
    const selectedCells = [...state.selectedCells, action.cellIndex];
    return {
      ...state,
      cells,
      selectedCells,
    };
  },

  [types.DESELECT_CELLS]: (state) => {
    const cells = state.cells.map(cell => (cell.selected ? ({ ...cell, selected: false }) : cell));
    return {
      ...state,
      cells,
      selectedCells: [],
    };
  },

  [types.GUESS_WORD]: (state) => {
    const words = state.words.map(
      (word, idx) => (idx === state.currentWordIndex ? ({ ...word, guessed: true }) : word),
    );
    const cells = state.cells.map(
      (cell, idx) => (state.selectedCells.includes(idx) ? ({ ...cell, flipped: true }) : cell),
    );
    const gameState = words.every(word => word.guessed || word.discarded) ? 'end' : state.gameState;
    const nextWordIndex = words.findIndex(word => !word.guessed && !word.discarded);
    const currentWordIndex = nextWordIndex !== -1 ? nextWordIndex : state.currentWordIndex;
    return {
      ...state,
      words,
      cells,
      gameState,
      currentWordIndex,
    };
  },

  [types.DISCARD_WORD]: (state, action) => {
    const { discardedWordIndex } = action;
    const words = state.words.map(
      (word, index) => (index === discardedWordIndex ? ({ ...word, discarded: true }) : word),
    );

    const connection = state.connections[words[discardedWordIndex].key];
    // find cells that belong to the discarded word and flip them
    const cells = state.cells.map(
      (cell) => {
        if (connection.findIndex(([row, col]) => cell.row === row && cell.col === col) !== -1) {
          return { ...cell, flipped: true };
        }
        return cell;
      },
    );

    const gameState = words.every(word => word.guessed || word.discarded) ? 'end' : state.gameState;

    return {
      ...state,
      words,
      cells,
      gameState,
    };
  },

  [types.PLAY_GAME]: state => ({
    ...state,
    gameState: 'playing',
  }),

  [types.CLEAR_GAME]: () => ({
    ...initialState,
  }),
};

const gameReducer = (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};

export default gameReducer;
