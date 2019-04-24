import { put, all, takeEvery, select } from "redux-saga/effects";

import { KeyValueService } from "api";
import { activeCharacterSelector } from "./character";
import { openToastr, TOASTR_ERROR } from "./toastr";

/** *****************************************************************
    Constants
****************************************************************** */

const FETCH_AC_START = "FETCH_AC_START";
const FETCH_AC_SUCCESS = "FETCH_AC_SUCCESS";
const FETCH_AC_ERROR = "FETCH_AC_ERROR";

const SAVE_AC_START = "SAVE_AC_START";
const SAVE_AC_SUCCESS = "SAVE_AC_SUCCESS";
const SAVE_AC_ERROR = "SAVE_AC_ERROR";

type State = {
  ac: { total: string }
};

const INITIAL_STATE: State = {
  ac: { total: "10" }
};

/** *****************************************************************
    Reducer
****************************************************************** */

export const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_AC_SUCCESS:
      return {
        ...state,
        ac: action.payload.ac
      };

    default:
      return state;
  }
};

/** *****************************************************************
    Actions
****************************************************************** */

export const fetchAC = () => ({
  type: FETCH_AC_START
});

export const saveAC = (ac: Object) => ({
  type: SAVE_AC_START,
  payload: { ac }
});

/** *****************************************************************
    Selectors
****************************************************************** */

export const ACSelector = (state: Object): Object => state.ac.ac;

/** *****************************************************************
    Sagas
****************************************************************** */

export function* fetchACSaga() {
  const activeCharacter = yield select(activeCharacterSelector);

  try {
    const ac = yield KeyValueService.getValue(`${activeCharacter}/ac`);
    yield put({ type: FETCH_AC_SUCCESS, payload: { ac } });
  } catch (exception) {
    yield put({ type: FETCH_AC_ERROR });
    yield put(openToastr({ text: `${exception}`, type: TOASTR_ERROR }));
  }
}

export function* saveACSaga({ payload: { ac } }: Object) {
  const activeCharacter = yield select(activeCharacterSelector);

  yield KeyValueService.setValue(`${activeCharacter}/ac`, JSON.stringify(ac));

  yield put({ type: SAVE_AC_SUCCESS });
  yield put(fetchAC());
}

export function* sagas() {
  yield all([
    (function*() {
      yield takeEvery(FETCH_AC_START, fetchACSaga);
    })(),
    (function*() {
      yield takeEvery(SAVE_AC_START, saveACSaga);
    })()
  ]);
}
