import * as types from 'app/constants/actionTypes';
import dictionariesConfig from 'app/constants/dictionariesConfig';

const initialState = {
  rows: 5,
  cols: 5,
  practiceBothway: false,
  languagePack: Object.keys(dictionariesConfig.DICTIONARIES)[0],
};

const handlers = {
  [types.CHANGE_NUMBER_ROWS]: (state, action) => ({ ...state, rows: action.rows }),
  [types.CHANGE_NUMBER_COLS]: (state, action) => ({ ...state, cols: action.cols }),
  [types.TOGGLE_PRACTICE_BOTHWAY]: (state, action) => ({ ...state, practiceBothway: !state.practiceBothway }),
  [types.SET_LANGUAGE_PACK]: (state, action) => ({ ...state, languagePack: action.languagePack }),
};

export const optionsReducer = function (state = initialState, action) {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};
