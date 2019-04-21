import { take, put, all, takeEvery, select } from "redux-saga/effects";

import { KeyValueService } from "api";
import { pushRoute } from "./navigation";
import { activeCharacterSelector } from "./character";

/** *****************************************************************
    Constants
****************************************************************** */

const FETCH_ABILITIES_START = "FETCH_ABILITIES_START";
const FETCH_ABILITIES_SUCCESS = "FETCH_ABILITIES_SUCCESS";
const FETCH_ABILITIES_ERROR = "FETCH_ABILITIES_ERROR";

type State = {
  abilities: object
};

const INITIAL_STATE: State = {
  abilities: {
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charisma: 1,
  },
};

/** *****************************************************************
    Reducer
****************************************************************** */

export const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ABILITIES_SUCCESS:
      return {
        ...state,
        abilities: action.payload.abilities,
      };

    default:
      return state;
  }
};

/** *****************************************************************
    Actions
****************************************************************** */

export const fetchAbilities = () => ({
  type: FETCH_ABILITIES_START,
});

/** *****************************************************************
    Selectors
****************************************************************** */

export const abilitiesSelector = (state: Object): object => state.abilities.abilities;

/** *****************************************************************
    Sagas
****************************************************************** */

export function* fetchAbilitiesSaga() {
  const activeCharacter = yield select(activeCharacterSelector);

  const abilities = yield KeyValueService.getValue(
    `${activeCharacter}/abilities`,
  );

  yield put({ type: FETCH_ABILITIES_SUCCESS, payload: { abilities } });
}

export function* sagas() {
  yield all([
    (function* () {
      yield takeEvery(FETCH_ABILITIES_START, fetchAbilitiesSaga);
    }()),
  ]);
}
