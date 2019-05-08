import { put, all, takeEvery, select } from "redux-saga/effects";

import { KeyValueService } from "api";
import { activeCharacterSelector } from "./character";
import { openToastr, TOASTR_ERROR } from "./toastr";

/** *****************************************************************
    Constants
****************************************************************** */

const FETCH_SAVING_THROWS_START = "FETCH_SAVING_THROWS_START";
const FETCH_SAVING_THROWS_SUCCESS = "FETCH_SAVING_THROWS_SUCCESS";
const FETCH_SAVING_THROWS_ERROR = "FETCH_SAVING_THROWS_ERROR";

const SAVE_SAVING_THROWS_START = "SAVE_SAVING_THROWS_START";
const SAVE_SAVING_THROWS_SUCCESS = "SAVE_SAVING_THROWS_SUCCESS";
const SAVE_SAVING_THROWS_ERROR = "SAVE_SAVING_THROWS_ERROR";

type State = {
  savingThrows: {
    strength: boolean,
    dexterity: boolean,
    constitution: boolean,
    intelligence: boolean,
    wisdom: boolean,
    charisma: boolean
  }
};

export const INITIAL_STATE: State = {
  savingThrows: {
    strength: false,
    dexterity: false,
    constitution: false,
    intelligence: false,
    wisdom: false,
    charisma: false
  }
};

/** *****************************************************************
    Reducer
****************************************************************** */

export const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SAVING_THROWS_SUCCESS:
      return {
        ...state,
        savingThrows: action.payload.savingThrows
      };

    default:
      return state;
  }
};

/** *****************************************************************
    Actions
****************************************************************** */

export const fetchSavingThrows = () => ({
  type: FETCH_SAVING_THROWS_START
});

export const saveSavingThrows = (savingThrows: Object) => ({
  type: SAVE_SAVING_THROWS_START,
  payload: { savingThrows }
});

/** *****************************************************************
    Selectors
****************************************************************** */

export const savingThrowsSelector = (state: Object): Object =>
  state.savingThrows.savingThrows;

/** *****************************************************************
    Sagas
****************************************************************** */

export function* fetchSavingThrowsSaga() {
  const activeCharacter = yield select(activeCharacterSelector);

  try {
    const savingThrows = yield KeyValueService.getValue(
      `${activeCharacter}/savingThrows`
    );

    yield put({ type: FETCH_SAVING_THROWS_SUCCESS, payload: { savingThrows } });
  } catch (exception) {
    yield put({ type: FETCH_SAVING_THROWS_ERROR });
    yield put(openToastr({ text: `${exception}`, type: TOASTR_ERROR }));
  }
}

export function* saveSavingThrowsSaga({ payload: { savingThrows } }: Object) {
  const activeCharacter = yield select(activeCharacterSelector);

  // TODO: put these inside of a try-catch!!
  yield KeyValueService.setValue(
    `${activeCharacter}/savingThrows`,
    JSON.stringify(savingThrows)
  );

  yield put({ type: SAVE_SAVING_THROWS_SUCCESS });
  yield put(fetchSavingThrows());
}

export function* sagas() {
  yield all([
    (function*() {
      yield takeEvery(FETCH_SAVING_THROWS_START, fetchSavingThrowsSaga);
    })(),
    (function*() {
      yield takeEvery(SAVE_SAVING_THROWS_START, saveSavingThrowsSaga);
    })()
  ]);
}
