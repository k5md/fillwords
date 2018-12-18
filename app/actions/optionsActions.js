import * as types from 'app/constants/actionTypes';

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

export function togglePracticeBothway() {
    return {
        type: types.TOGGLE_PRACTICE_BOTHWAY,
    };
}

export function setLanguagePack(languagePack) {
    return {
        type: types.SET_LANGUAGE_PACK,
        languagePack,
    };
}
