import { put, all, takeEvery, select } from "redux-saga/effects";

import { KeyValueService } from "api";
import { openToastr, TOASTR_ERROR } from "./toastr";

/** *****************************************************************
    Constants
****************************************************************** */

const FETCH_ALL_KEYS_START = "FETCH_ALL_KEYS_START";
const FETCH_ALL_KEYS_SUCCESS = "FETCH_ALL_KEYS_SUCCESS";
const FETCH_ALL_KEYS_ERROR = "FETCH_ALL_KEYS_ERROR";

type State = {
  keys: [string]
};

const INITIAL_STATE: State = {
  keys: []
};

/** *****************************************************************
    Reducer
****************************************************************** */

export const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_KEYS_SUCCESS:
      return {
        ...state,
        keys: action.payload.keys
      };

    default:
      return state;
  }
};

/** *****************************************************************
    Actions
****************************************************************** */

export const fetchAllPairs = () => ({
  type: FETCH_ALL_KEYS_START
});

/** *****************************************************************
    Selectors
****************************************************************** */

export const keysSelector = (state: Object): [] => state.keyValuePairs.keys;

/** *****************************************************************
    Sagas
****************************************************************** */

export function* fetchAllKeysSaga() {
  try {
    const keys = yield KeyValueService.getAllKeys();
    yield put({ type: FETCH_ALL_KEYS_SUCCESS, payload: { keys } });
  } catch (exception) {
    yield put({ type: FETCH_ALL_KEYS_ERROR });
    yield put(
      openToastr({ text: "Failed to fetch keys.", type: TOASTR_ERROR })
    );
  }
}

export function* sagas() {
  yield all([
    (function*() {
      yield takeEvery(FETCH_ALL_KEYS_START, fetchAllKeysSaga);
    })()
  ]);
}
