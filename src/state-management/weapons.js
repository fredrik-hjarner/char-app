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

const INITIAL_STATE: State = {
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
        ...action.payload.hp
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

export const saveWeapons = (hp: Object) => ({
  type: SAVE_WEAPONS_START,
  payload: { hp }
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
    let weapons = yield KeyValueService.getValue(`${activeCharacter}/hp`);

    /**
     * TODO: This is quite ugly but check if no values was returned
     * and put in default props.
     */
    if (!weapons?.weapons) {
      weapons = {
        maxHP: 0,
        currentHP: 0
      };
    }

    yield put({ type: FETCH_WEAPONS_SUCCESS, payload: { weapons } });
  } catch (exception) {
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

  yield put({ type: SAVE_WEAPONS_SUCCESS });
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
