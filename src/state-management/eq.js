import { put, all, takeEvery, select } from "redux-saga/effects";

import { KeyValueService } from "api";
import { activeCharacterSelector } from "./character";
import { openToastr, TOASTR_ERROR } from "./toastr";

/** *****************************************************************
    Constants
****************************************************************** */

const FETCH_EQ_START = "FETCH_EQ_START";
const FETCH_EQ_SUCCESS = "FETCH_EQ_SUCCESS";
const FETCH_EQ_ERROR = "FETCH_EQ_ERROR";

const SAVE_EQ_START = "SAVE_EQ_START";
const SAVE_EQ_SUCCESS = "SAVE_EQ_SUCCESS";
const SAVE_EQ_ERROR = "SAVE_EQ_ERROR";

type State = {
  eq: {
    gold: string,
    silver: string,
    copper: string,
    eq: string
  }
};

const INITIAL_STATE: State = {
  eq: {
    gold: "0",
    silver: "0",
    copper: "0",
    eq: ""
  }
};

/** *****************************************************************
    Reducer
****************************************************************** */

export const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_EQ_SUCCESS:
      return {
        ...state,
        ...action.payload.eq
      };

    default:
      return state;
  }
};

/** *****************************************************************
    Actions
****************************************************************** */

export const fetchEQ = () => ({
  type: FETCH_EQ_START
});

export const saveEQ = (eq: Object) => ({
  type: SAVE_EQ_START,
  payload: { eq }
});

/** *****************************************************************
    Selectors
****************************************************************** */

export const EQSelector = (state: Object): Object => state.eq;

/** *****************************************************************
    Sagas
****************************************************************** */

export function* fetchEQSaga() {
  const activeCharacter = yield select(activeCharacterSelector);

  try {
    let eq = yield KeyValueService.getValue(`${activeCharacter}/eq`);

    /**
     * TODO: This is quite ugly but check if no values was returned
     * and put in default props.
     */
    if (!eq?.gold) {
      eq = INITIAL_STATE.eq; // eslint-disable-line
    }

    yield put({ type: FETCH_EQ_SUCCESS, payload: { eq } });
  } catch (exception) {
    console.log("fetchInfoSaga: catch:");
    yield put({ type: FETCH_EQ_ERROR });
    yield put(openToastr({ text: `${exception}`, type: TOASTR_ERROR }));
  }
}

export function* saveEQSaga({ payload: { eq } }: Object) {
  const activeCharacter = yield select(activeCharacterSelector);

  yield KeyValueService.setValue(`${activeCharacter}/eq`, JSON.stringify(eq));

  yield put({ type: SAVE_EQ_SUCCESS });
  yield put(fetchEQ());
}

export function* sagas() {
  yield all([
    (function*() {
      yield takeEvery(FETCH_EQ_START, fetchEQSaga);
    })(),
    (function*() {
      yield takeEvery(SAVE_EQ_START, saveEQSaga);
    })()
  ]);
}
