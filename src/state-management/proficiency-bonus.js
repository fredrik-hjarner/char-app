import { put, all, takeEvery, select } from "redux-saga/effects";

import { KeyValueService } from "api";
import { activeCharacterSelector } from "./character";
import { openToastr, TOASTR_ERROR } from "./toastr";

/** *****************************************************************
    Constants
****************************************************************** */

const FETCH_PROFICIENCY_BONUS_START = "FETCH_PROFICIENCY_BONUS_START";
const FETCH_PROFICIENCY_BONUS_SUCCESS = "FETCH_PROFICIENCY_BONUS_SUCCESS";
const FETCH_PROFICIENCY_BONUS_ERROR = "FETCH_PROFICIENCY_BONUS_ERROR";

const SAVE_PROFICIENCY_BONUS_START = "SAVE_PROFICIENCY_BONUS_START";
const SAVE_PROFICIENCY_BONUS_SUCCESS = "SAVE_PROFICIENCY_BONUS_SUCCESS";
const SAVE_PROFICIENCY_BONUS_ERROR = "SAVE_PROFICIENCY_BONUS_ERROR";

type State = {
  proficiencyBonus: string
};

export const INITIAL_STATE: State = {
  proficiencyBonus: "0"
};

/** *****************************************************************
    Reducer
****************************************************************** */

export const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PROFICIENCY_BONUS_SUCCESS:
      return {
        ...state,
        proficiencyBonus: action.payload.proficiencyBonus
      };

    default:
      return state;
  }
};

/** *****************************************************************
    Actions
****************************************************************** */

export const fetchProficiencyBonus = () => ({
  type: FETCH_PROFICIENCY_BONUS_START
});

export const saveProficiencyBonus = (proficiencyBonus: Object) => ({
  type: SAVE_PROFICIENCY_BONUS_START,
  payload: { ...proficiencyBonus }
});

/** *****************************************************************
    Selectors
****************************************************************** */

export const proficiencyBonusSelector = (state: Object): Object =>
  state.proficiencyBonus;

/** *****************************************************************
    Sagas
****************************************************************** */

export function* fetchProficiencyBonusSaga() {
  const activeCharacter = yield select(activeCharacterSelector);

  try {
    const proficiencyBonus = yield KeyValueService.getValue(
      `${activeCharacter}/proficiencyBonus`
    );
    yield put({
      type: FETCH_PROFICIENCY_BONUS_SUCCESS,
      payload: { proficiencyBonus }
    });
  } catch (exception) {
    console.log("fetchProficiencyBonusSaga: catch:");
    yield put({ type: FETCH_PROFICIENCY_BONUS_ERROR });
    yield put(openToastr({ text: `${exception}`, type: TOASTR_ERROR }));
  }
}

export function* saveProficiencyBonusSaga({
  payload: { proficiencyBonus }
}: Object) {
  const activeCharacter = yield select(activeCharacterSelector);

  yield KeyValueService.setValue(
    `${activeCharacter}/proficiencyBonus`,
    JSON.stringify(proficiencyBonus)
  );

  yield put({ type: SAVE_PROFICIENCY_BONUS_SUCCESS });
  yield put(fetchProficiencyBonus());
}

export function* sagas() {
  yield all([
    (function*() {
      yield takeEvery(FETCH_PROFICIENCY_BONUS_START, fetchProficiencyBonusSaga);
    })(),
    (function*() {
      yield takeEvery(SAVE_PROFICIENCY_BONUS_START, saveProficiencyBonusSaga);
    })()
  ]);
}
