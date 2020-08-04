import * as types from '../constants/actionTypes';
import dictionariesConfig from '../config/dictionaries';

const initialState = {
  rows: 5,
  cols: 5,
  languagePack: Object.keys(dictionariesConfig.DICTIONARIES)[0],
  showHelp: false,
  isDBReady: false,
};

const handlers = {
  [types.CHANGE_NUMBER_ROWS]: (state, action) => ({
    ...state,
    rows: action.rows,
  }),

  [types.CHANGE_NUMBER_COLS]: (state, action) => ({
    ...state,
    cols: action.cols,
  }),

  [types.SET_LANGUAGE_PACK]: (state, action) => ({
    ...state,
    languagePack: action.languagePack,
  }),

  [types.TOGGLE_SHOW_HELP]: state => ({ ...state, showHelp: !state.showHelp }),

  [types.DB_NOT_READY]: state => ({ ...state, isDBReady: false }),
  [types.DB_READY]: state => ({ ...state, isDBReady: true }),
};

const optionsReducer = (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};

export default optionsReducer;
