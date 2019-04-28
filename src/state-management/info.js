import { put, all, takeEvery, select } from "redux-saga/effects";

import { KeyValueService } from "api";
import { activeCharacterSelector } from "./character";
import { openToastr, TOASTR_ERROR } from "./toastr";

/** *****************************************************************
    Constants
****************************************************************** */

const FETCH_INFO_START = "FETCH_INFO_START";
const FETCH_INFO_SUCCESS = "FETCH_INFO_SUCCESS";
const FETCH_INFO_ERROR = "FETCH_INFO_ERROR";

const SAVE_INFO_START = "SAVE_INFO_START";
const SAVE_INFO_SUCCESS = "SAVE_INFO_SUCCESS";
const SAVE_INFO_ERROR = "SAVE_INFO_ERROR";

type State = {
  info: {
    characterName: string,
    playerName: string,
    classesAndLevels: string,
    race: string,
    alignment: string,
    xp: string,

    ideals: string,
    bonds: string,
    flaws: string,
    background: string
  }
};

export const INITIAL_STATE: State = {
  info: {
    characterName: "placeholder",
    playerName: "placeholder",
    classesAndLevels: "placeholder",
    race: "placeholder",
    alignment: "placeholder",
    xp: "placeholder",

    ideals: "placeholder",
    bonds: "placeholder",
    flaws: "placeholder",
    background: "placeholder"
  }
};

/** *****************************************************************
    Reducer
****************************************************************** */

export const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_INFO_SUCCESS:
      return {
        ...state,
        info: action.payload.info
      };

    default:
      return state;
  }
};

/** *****************************************************************
    Actions
****************************************************************** */

export const fetchInfo = () => ({
  type: FETCH_INFO_START
});

export const saveInfo = (info: Object) => ({
  type: SAVE_INFO_START,
  payload: { info }
});

/** *****************************************************************
    Selectors
****************************************************************** */

export const infoSelector = (state: Object): Object => state.info.info;

/** *****************************************************************
    Sagas
****************************************************************** */

export function* fetchInfoSaga() {
  const activeCharacter = yield select(activeCharacterSelector);

  try {
    let info = yield KeyValueService.getValue(`${activeCharacter}/info`);

    /**
     * TODO: This is quite ugly but check if no values was returned
     * and put in default props.
     */
    if (!info?.playerName) {
      info = INITIAL_STATE.info; // eslint-disable-line
    }

    yield put({ type: FETCH_INFO_SUCCESS, payload: { info } });
  } catch (exception) {
    console.log("fetchInfoSaga: catch:");
    yield put({ type: FETCH_INFO_ERROR });
    yield put(openToastr({ text: `${exception}`, type: TOASTR_ERROR }));
  }
}

export function* saveInfoSaga({ payload: { info } }: Object) {
  const activeCharacter = yield select(activeCharacterSelector);

  yield KeyValueService.setValue(
    `${activeCharacter}/info`,
    JSON.stringify(info)
  );

  yield put({ type: SAVE_INFO_SUCCESS });
  yield put(fetchInfo());
}

export function* sagas() {
  yield all([
    (function*() {
      yield takeEvery(FETCH_INFO_START, fetchInfoSaga);
    })(),
    (function*() {
      yield takeEvery(SAVE_INFO_START, saveInfoSaga);
    })()
  ]);
}
