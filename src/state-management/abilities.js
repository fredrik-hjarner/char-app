import { put, all, takeEvery, select } from "redux-saga/effects";

import { KeyValueService } from "api";
import { activeCharacterSelector } from "./character";
import { openToastr, TOASTR_ERROR } from "./toastr";

/** *****************************************************************
    Constants
****************************************************************** */

const FETCH_ABILITIES_START = "FETCH_ABILITIES_START";
const FETCH_ABILITIES_SUCCESS = "FETCH_ABILITIES_SUCCESS";
const FETCH_ABILITIES_ERROR = "FETCH_ABILITIES_ERROR";

const SAVE_ABILITIES_START = "SAVE_ABILITIES_START";
const SAVE_ABILITIES_SUCCESS = "SAVE_ABILITIES_SUCCESS";
const SAVE_ABILITIES_ERROR = "SAVE_ABILITIES_ERROR";

type State = {
  abilities: Object
};

const INITIAL_STATE: State = {
  abilities: {
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charisma: 1
  }
};

/** *****************************************************************
    Reducer
****************************************************************** */

export const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ABILITIES_SUCCESS:
      return {
        ...state,
        abilities: action.payload.abilities
      };

    default:
      return state;
  }
};

/** *****************************************************************
    Actions
****************************************************************** */

export const fetchAbilities = () => ({
  type: FETCH_ABILITIES_START
});

export const saveAbilities = (abilities: Object) => ({
  type: SAVE_ABILITIES_START,
  payload: { abilities }
});

/** *****************************************************************
    Selectors
****************************************************************** */

export const abilitiesSelector = (state: Object): Object =>
  state.abilities.abilities;

/** *****************************************************************
    Sagas
****************************************************************** */

export function* fetchAbilitiesSaga() {
  const activeCharacter = yield select(activeCharacterSelector);

  try {
    let abilities = yield KeyValueService.getValue(
      `${activeCharacter}/abilities`
    );

    /**
     * TODO: This is quite ugly but check if no values was returned
     * and put in default props.
     */
    if (!abilities?.strength) {
      abilities = {
        strength: 1,
        dexterity: 1,
        constitution: 1,
        intelligence: 1,
        wisdom: 1,
        charisma: 1
      };
    }

    yield put({ type: FETCH_ABILITIES_SUCCESS, payload: { abilities } });
  } catch (exception) {
    yield put({ type: FETCH_ABILITIES_ERROR });
    yield put(openToastr({ text: `${exception}`, type: TOASTR_ERROR }));
  }
}

export function* saveAbilitiesSaga(abilities: Object) {
  const activeCharacter = yield select(activeCharacterSelector);

  yield KeyValueService.setValue(`${activeCharacter}/abilities`, abilities);

  yield put({ type: SAVE_ABILITIES_SUCCESS });
  yield put(fetchAbilities());
}

export function* sagas() {
  yield all([
    (function*() {
      yield takeEvery(FETCH_ABILITIES_START, fetchAbilitiesSaga);
    })(),
    (function*() {
      yield takeEvery(SAVE_ABILITIES_START, saveAbilitiesSaga);
    })()
  ]);
}
