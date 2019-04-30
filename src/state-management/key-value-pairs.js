import { put, all, takeEvery, take } from "redux-saga/effects";

import { KeyValueService } from "api";
import { openToastr, TOASTR_ERROR, TOASTR_SUCCESS } from "./toastr";

/** *****************************************************************
    Constants
****************************************************************** */

const FETCH_ALL_KEYS_START = "FETCH_ALL_KEYS_START";
const FETCH_ALL_KEYS_SUCCESS = "FETCH_ALL_KEYS_SUCCESS";
const FETCH_ALL_KEYS_ERROR = "FETCH_ALL_KEYS_ERROR";

const FETCH_ALL_PAIRS_START = "FETCH_ALL_PAIRS_START";
const FETCH_ALL_PAIRS_SUCCESS = "FETCH_ALL_PAIRS_SUCCESS";
const FETCH_ALL_PAIRS_ERROR = "FETCH_ALL_PAIRS_ERROR";

const DELETE_ALL_PAIRS_START = "DELETE_ALL_PAIRS_START";
const DELETE_ALL_PAIRS_SUCCESS = "DELETE_ALL_PAIRS_SUCCESS";
const DELETE_ALL_PAIRS_ERROR = "DELETE_ALL_PAIRS_ERROR";

type State = {
  keys: [string],
  pairs: [{ key: string, value: string }]
};

const INITIAL_STATE: State = {
  keys: [],
  pairs: []
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

    case FETCH_ALL_PAIRS_SUCCESS:
      return {
        ...state,
        pairs: action.payload.pairs
      };

    default:
      return state;
  }
};

/** *****************************************************************
    Actions
****************************************************************** */

export const fetchAllKeys = () => ({
  type: FETCH_ALL_KEYS_START
});

export const fetchAllPairs = () => ({
  type: FETCH_ALL_PAIRS_START
});

export const deleteAllPairs = () => ({
  type: DELETE_ALL_PAIRS_START
});

/** *****************************************************************
    Selectors
****************************************************************** */

export const keysSelector = (state: Object): [] => state.keyValuePairs.keys;
export const pairsSelector = (state: Object): [] => state.keyValuePairs.pairs;

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

export function* fetchAllPairsSaga() {
  yield put({ type: FETCH_ALL_KEYS_START });

  const { type, payload } = yield take([
    FETCH_ALL_KEYS_SUCCESS,
    FETCH_ALL_KEYS_ERROR
  ]);

  if (type === FETCH_ALL_KEYS_SUCCESS) {
    const { keys } = payload;
    const getValueRequests = keys.map(k => KeyValueService.getValue(k));
    try {
      const values = yield all(getValueRequests);
      const pairs = keys.map((k, i) => ({ key: k, value: values[i] }));
      yield put({ type: FETCH_ALL_PAIRS_SUCCESS, payload: { pairs } });
    } catch (exception) {
      openToastr({ text: exception, type: TOASTR_ERROR });
    }
  } else {
    yield put(
      openToastr({ text: "Failed to fetch pairs.", type: TOASTR_ERROR })
    );
  }
}

export function* deleteAllKeysSaga() {
  try {
    yield KeyValueService.deleteAllValues();
    yield put({ type: DELETE_ALL_PAIRS_SUCCESS });
    yield put(fetchAllPairs());
    yield put(openToastr({ text: "Deleted all pairs.", type: TOASTR_SUCCESS }));
  } catch (exception) {
    yield put({ type: DELETE_ALL_PAIRS_ERROR });
    yield put(
      openToastr({ text: "Failed to delete all pairs.", type: TOASTR_ERROR })
    );
  }
}

export function* sagas() {
  yield all([
    (function*() {
      yield takeEvery(FETCH_ALL_KEYS_START, fetchAllKeysSaga);
    })(),
    (function*() {
      yield takeEvery(FETCH_ALL_PAIRS_START, fetchAllPairsSaga);
    })(),
    (function*() {
      yield takeEvery(DELETE_ALL_PAIRS_START, deleteAllKeysSaga);
    })()
  ]);
}
