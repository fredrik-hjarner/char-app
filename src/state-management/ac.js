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
  ac: number
};

const INITIAL_STATE: State = {
  ac: 10
};

/** *****************************************************************
    Reducer
****************************************************************** */

export const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_AC_SUCCESS:
      return {
        ...state,
        ...action.payload.ac
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

export const totalACSelector = (state: Object): Object => state.ac.ac;

/** *****************************************************************
    Sagas
****************************************************************** */

export function* fetchACSaga() {
  const activeCharacter = yield select(activeCharacterSelector);

  try {
    let ac = yield KeyValueService.getValue(`${activeCharacter}/ac`);

    /**
     * TODO: This is quite ugly but check if no values was returned
     * and put in default props.
     */
    if (!ac?.ac) {
      ac = {
        ac: 10
      };
    }

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
