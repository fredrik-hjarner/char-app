import { put, all, takeEvery, select } from "redux-saga/effects";

import { KeyValueService } from "api";
import { activeCharacterSelector } from "./character";
import { openToastr, TOASTR_ERROR } from "./toastr";

/** *****************************************************************
    Constants
****************************************************************** */

const FETCH_HP_START = "FETCH_HP_START";
const FETCH_HP_SUCCESS = "FETCH_HP_SUCCESS";
const FETCH_HP_ERROR = "FETCH_HP_ERROR";

const SAVE_HP_START = "SAVE_HP_START";
const SAVE_HP_SUCCESS = "SAVE_HP_SUCCESS";
const SAVE_HP_ERROR = "SAVE_HP_ERROR";

type State = {
  maxHP: number,
  currentHP: number
};

const INITIAL_STATE: State = {
  maxHP: "1",
  currentHP: "1"
};

/** *****************************************************************
    Reducer
****************************************************************** */

export const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_HP_SUCCESS:
      return {
        ...state,
        ...action.payload.hp
      };

    default:
      return state;
  }
};

/** *****************************************************************
    Actions
****************************************************************** */

export const fetchHP = () => ({
  type: FETCH_HP_START
});

export const saveHP = (hp: Object) => ({
  type: SAVE_HP_START,
  payload: { hp }
});

/** *****************************************************************
    Selectors
****************************************************************** */

export const HPSelector = (state: Object): Object => state.hp;
export const maxHPSelector = (state: Object): Object => state.hp.maxHP;
export const currentHPSelector = (state: Object): Object => state.hp.currentHP;

/** *****************************************************************
    Sagas
****************************************************************** */

export function* fetchHPSaga() {
  const activeCharacter = yield select(activeCharacterSelector);

  try {
    let hp = yield KeyValueService.getValue(`${activeCharacter}/hp`);

    /**
     * TODO: This is quite ugly but check if no values was returned
     * and put in default props.
     */
    if (!hp?.maxHP) {
      hp = {
        maxHP: 0,
        currentHP: 0
      };
    }

    yield put({ type: FETCH_HP_SUCCESS, payload: { hp } });
  } catch (exception) {
    console.log("fetchHPSaga: catch:");
    yield put({ type: FETCH_HP_ERROR });
    yield put(openToastr({ text: `${exception}`, type: TOASTR_ERROR }));
  }
}

export function* saveHPSaga({ payload: { hp } }: Object) {
  const activeCharacter = yield select(activeCharacterSelector);

  yield KeyValueService.setValue(`${activeCharacter}/hp`, JSON.stringify(hp));

  yield put({ type: SAVE_HP_SUCCESS });
  yield put(fetchHP());
}

export function* sagas() {
  yield all([
    (function*() {
      yield takeEvery(FETCH_HP_START, fetchHPSaga);
    })(),
    (function*() {
      yield takeEvery(SAVE_HP_START, saveHPSaga);
    })()
  ]);
}
