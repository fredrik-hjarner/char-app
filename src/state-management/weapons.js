import { put, all, takeEvery, select } from "redux-saga/effects";

import { KeyValueService } from "api";
import { activeCharacterSelector } from "./character";
import { openToastr, TOASTR_ERROR } from "./toastr";

/** *****************************************************************
    Constants
****************************************************************** */

const FETCH_WEAPONS_START = "FETCH_WEAPONS_START";
const FETCH_WEAPONS_SUCCESS = "FETCH_WEAPONS_SUCCESS";
const FETCH_WEAPONS_ERROR = "FETCH_WEAPONS_ERROR";

const SAVE_WEAPONS_START = "SAVE_WEAPONS_START";
const SAVE_WEAPONS_SUCCESS = "SAVE_WEAPONS_SUCCESS";
const SAVE_WEAPONS_ERROR = "SAVE_WEAPONS_ERROR";

type Weapon = {
  weapon: string,
  type: string,
  range: string,
  attackBonus: string,
  damage: string
};

type State = {
  weapons: [Weapon]
};

export const INITIAL_STATE: State = {
  weapons: [
    {
      weapon: "Longsword",
      type: "Martial",
      range: "Melee",
      attackBonus: "+4",
      damage: "1d8+2"
    },
    {
      weapon: "Longsword",
      type: "Martial",
      range: "Melee",
      attackBonus: "+4",
      damage: "1d8+2"
    }
  ]
};

/** *****************************************************************
    Reducer
****************************************************************** */

export const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_WEAPONS_SUCCESS:
      return {
        ...state,
        weapons: action.payload.weapons
      };

    default:
      return state;
  }
};

/** *****************************************************************
    Actions
****************************************************************** */

export const fetchWeapons = () => ({
  type: FETCH_WEAPONS_START
});

export const saveWeapons = (weapons: []) => ({
  type: SAVE_WEAPONS_START,
  payload: { weapons }
});

/** *****************************************************************
    Selectors
****************************************************************** */

export const weaponsSelector = (state: Object): Object => state.weapons.weapons;

/** *****************************************************************
    Sagas
****************************************************************** */

export function* fetchWeaponsSaga() {
  const activeCharacter = yield select(activeCharacterSelector);

  try {
    const weapons = yield KeyValueService.getValue(
      `${activeCharacter}/weapons`
    );
    yield put({ type: FETCH_WEAPONS_SUCCESS, payload: { weapons } });
  } catch (exception) {
    console.log("fetchWeaponsSaga: exception:", exception, "");
    yield put({ type: FETCH_WEAPONS_ERROR });
    yield put(openToastr({ text: `${exception}`, type: TOASTR_ERROR }));
  }
}

export function* saveWeaponsSaga({ payload: { weapons } }: Object) {
  const activeCharacter = yield select(activeCharacterSelector);

  yield KeyValueService.setValue(
    `${activeCharacter}/weapons`,
    JSON.stringify(weapons)
  );

  yield put({ type: SAVE_WEAPONS_SUCCESS, payload: { weapons } });
  yield put(fetchWeapons());
}

export function* sagas() {
  yield all([
    (function*() {
      yield takeEvery(FETCH_WEAPONS_START, fetchWeaponsSaga);
    })(),
    (function*() {
      yield takeEvery(SAVE_WEAPONS_START, saveWeaponsSaga);
    })()
  ]);
}
