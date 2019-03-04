import * as types from '../constants/actionTypes';

export function setCurrentWordIndex(index) {
  return {
    type: types.SET_CURRENT_WORD_INDEX,
    index,
  };
}

export function setCells(cells) {
  return {
    type: types.SET_CELLS,
    cells,
  };
}

export function setConnections(connections) {
  return {
    type: types.SET_CONNECTIONS,
    connections,
  };
}

export function setSelectedCells(selectedCells) {
  return {
    type: types.SET_SELECTED_CELLS,
    selectedCells,
  };
}

export function setWords(words) {
  return {
    type: types.SET_WORDS,
    words,
  };
}

export function setupGame(config) {
  return {
    type: types.SETUP_GAME,
    config,
  };
}

export function selectCell(cellIndex) {
  return {
    type: types.SELECT_CELL,
    cellIndex,
  };
}

export function deselectCells() {
  return {
    type: types.DESELECT_CELLS,
  };
}

export function guessWord() {
  return {
    type: types.GUESS_WORD,
  };
}

export function discardWord(discardedWordIndex) {
  return {
    type: types.DISCARD_WORD,
    discardedWordIndex,
  };
}

export function playGame() {
  return {
    type: types.PLAY_GAME,
  };
}

export function clearGame() {
  return {
    type: types.CLEAR_GAME,
  };
}
