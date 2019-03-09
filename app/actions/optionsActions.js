import * as types from '../constants/actionTypes';

export function changeNumberRows(rows) {
  return {
    type: types.CHANGE_NUMBER_ROWS,
    rows,
  };
}

export function changeNumberCols(cols) {
  return {
    type: types.CHANGE_NUMBER_COLS,
    cols,
  };
}

export function setLanguagePack(languagePack) {
  return {
    type: types.SET_LANGUAGE_PACK,
    languagePack,
  };
}

export function toggleShowHelp() {
  return {
    type: types.TOGGLE_SHOW_HELP,
  };
}

export function dbReady() {
  return {
    type: types.DB_READY,
  };
}

export function dbNotReady() {
  return {
    type: types.DB_NOT_READY,
  };
}
