import { put, all, takeEvery, select } from "redux-saga/effects";

import { KeyValueService } from "api";
import { activeCharacterSelector } from "./character";
import { openToastr, TOASTR_ERROR } from "./toastr";

/** *****************************************************************
    Constants
****************************************************************** */

const FETCH_SKILLS_START = "FETCH_SKILLS_START";
const FETCH_SKILLS_SUCCESS = "FETCH_SKILLS_SUCCESS";
const FETCH_SKILLS_ERROR = "FETCH_SKILLS_ERROR";

const SAVE_SKILLS_START = "SAVE_SKILLS_START";
const SAVE_SKILLS_SUCCESS = "SAVE_SKILLS_SUCCESS";
const SAVE_SKILLS_ERROR = "SAVE_SKILLS_ERROR";

type State = {
  skills: {
    acrobatics: boolean,
    animalHandling: boolean,
    arcana: boolean,
    athletics: boolean,
    deception: boolean,
    history: boolean,
    insight: boolean,
    intimidation: boolean,
    investigation: boolean,
    medicine: boolean,
    nature: boolean,
    perception: boolean,
    performance: boolean,
    persuasion: boolean,
    religion: boolean,
    sleightOfHand: boolean,
    stealth: boolean,
    survival: boolean
  }
};

export const INITIAL_STATE: State = {
  skills: {
    acrobatics: true,
    animalHandling: true,
    arcana: true,
    athletics: true,
    deception: true,
    history: true,
    insight: true,
    intimidation: true,
    investigation: true,
    medicine: true,
    nature: true,
    perception: true,
    performance: true,
    persuasion: true,
    religion: true,
    sleightOfHand: true,
    stealth: true,
    survival: true
  }
};

/** *****************************************************************
    Reducer
****************************************************************** */

export const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SKILLS_SUCCESS:
      return {
        ...state,
        skills: action.payload.skills
      };

    default:
      return state;
  }
};

/** *****************************************************************
    Actions
****************************************************************** */

export const fetchSkills = () => ({
  type: FETCH_SKILLS_START
});

export const saveSkills = (skills: Object) => ({
  type: SAVE_SKILLS_START,
  payload: { skills }
});

/** *****************************************************************
    Selectors
****************************************************************** */

export const skillsSelector = (state: Object): Object => state.skills.skills;

/** *****************************************************************
    Sagas
****************************************************************** */

export function* fetchSkillsSaga() {
  const activeCharacter = yield select(activeCharacterSelector);

  try {
    const skills = yield KeyValueService.getValue(`${activeCharacter}/skills`);
    yield put({ type: FETCH_SKILLS_SUCCESS, payload: { skills } });
  } catch (exception) {
    console.log("fetchSkillsSaga: catch:");
    yield put({ type: FETCH_SKILLS_ERROR });
    yield put(openToastr({ text: `${exception}`, type: TOASTR_ERROR }));
  }
}

export function* saveSkillsSaga({ payload: { skills } }: Object) {
  const activeCharacter = yield select(activeCharacterSelector);

  yield KeyValueService.setValue(
    `${activeCharacter}/skills`,
    JSON.stringify(skills)
  );

  yield put({ type: SAVE_SKILLS_SUCCESS });
  yield put(fetchSkills());
}

export function* sagas() {
  yield all([
    (function*() {
      yield takeEvery(FETCH_SKILLS_START, fetchSkillsSaga);
    })(),
    (function*() {
      yield takeEvery(SAVE_SKILLS_START, saveSkillsSaga);
    })()
  ]);
}
