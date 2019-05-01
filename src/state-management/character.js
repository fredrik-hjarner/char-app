import { take, put, all, takeEvery } from "redux-saga/effects";

import { KeyValueService } from "api";
import { pushRoute } from "./navigation";
import { saveAbilities } from "./abilities";
import { saveHP } from "./hp";
import { saveAC } from "./ac";
import { saveWeapons, INITIAL_STATE as WEAPONS_INITIAL_STATE } from "./weapons";
import { saveInfo, INITIAL_STATE as INFO_INITIAL_STATE } from "./info";
import { saveEQ, INITIAL_STATE as EQ_INITIAL_STATE } from "./eq";
import { saveSkills, INITIAL_STATE as SKILLS_INITIAL_STATE } from "./skills";
import { openToastr, TOASTR_ERROR } from "./toastr";

/** *****************************************************************
    Constants
****************************************************************** */

const SET_ACTIVE_CHARACTER = "SET_ACTIVE_CHARACTER";

const CREATE_NEW_CHARACTER_START = "CREATE_NEW_CHARACTER_START";
const CREATE_NEW_CHARACTER_SUCCESS = "CREATE_NEW_CHARACTER_SUCCESS";
const CREATE_NEW_CHARACTER_ERROR = "CREATE_NEW_CHARACTER_ERROR";

const FETCH_CHARACTER_INDEX_START = "FETCH_CHARACTER_INDEX_START";
const FETCH_CHARACTER_INDEX_SUCCESS = "FETCH_CHARACTER_INDEX_SUCCESS";
const FETCH_CHARACTER_INDEX_ERROR = "FETCH_CHARACTER_INDEX_ERROR";

type State = {
  activeCharacter: string | null,
  characterIndex: [string]
};

const INITIAL_STATE: State = {
  activeCharacter: null,
  characterIndex: []
};

/** *****************************************************************
    Reducer
****************************************************************** */

export const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ACTIVE_CHARACTER:
      return {
        ...state,
        activeCharacter: action.payload.character
      };

    case FETCH_CHARACTER_INDEX_SUCCESS:
      return {
        ...state,
        characterIndex: action.payload.characters
      };

    default:
      return state;
  }
};

/** *****************************************************************
    Actions
****************************************************************** */

export const setActiveCharacter = (character: string) => ({
  type: SET_ACTIVE_CHARACTER,
  payload: { character }
});

export const createNewCharacter = (characterName: string) => ({
  type: CREATE_NEW_CHARACTER_START,
  payload: { characterName }
});

export const fetchCharacterIndex = () => ({
  type: FETCH_CHARACTER_INDEX_START
});

/** *****************************************************************
    Selectors
****************************************************************** */

export const activeCharacterSelector = (state: Object): string =>
  state.character.activeCharacter;

export const characterIndexSelector = (state: Object): [string] =>
  state.character.characterIndex;

/** *****************************************************************
    Sagas
****************************************************************** */

function* createNewCharacterSaga({ payload: { characterName } }) {
  try {
    yield KeyValueService.setValue(
      `character-index/${characterName}`,
      characterName
    );
    yield put(fetchCharacterIndex());
    // TODO: should really have a timeout, so it wont wait forever.
    yield take(FETCH_CHARACTER_INDEX_SUCCESS);

    yield put(setActiveCharacter(characterName));

    // Create default abilities
    yield put(
      saveAbilities({
        strength: "1",
        dexterity: "1",
        constitution: "1",
        intelligence: "1",
        wisdom: "1",
        charisma: "1"
      })
    );

    // Create default hp
    yield put(
      saveHP({
        maxHP: "1",
        currentHP: "1"
      })
    );

    // Create default ac
    yield put(saveAC({ total: "10" }));

    // Create default weapons
    yield put(saveWeapons(WEAPONS_INITIAL_STATE.weapons));

    // Create default info
    yield put(saveInfo(INFO_INITIAL_STATE.info));

    // Create default EQ
    yield put(saveEQ(EQ_INITIAL_STATE.eq));

    // Create default skills
    yield put(saveSkills(SKILLS_INITIAL_STATE.skills));

    yield put(pushRoute("Home"));
  } catch (exception) {
    console.log("exception:", exception, "");
    yield put(
      openToastr({ text: "Failed to create character.", type: TOASTR_ERROR })
    );
  }
}

function* fetchCharacterIndexSaga() {
  try {
    const characters = yield KeyValueService.getKeysWithPrefix(
      "character-index/"
    );

    if (characters.length === 0) {
      yield put(pushRoute("CreateFirstCharacter"));
    } else {
      yield put({
        type: FETCH_CHARACTER_INDEX_SUCCESS,
        payload: { characters }
      });
    }
  } catch {
    yield put({ type: FETCH_CHARACTER_INDEX_ERROR });
    yield put(pushRoute("CreateFirstCharacter"));
  }
}

export function* sagas() {
  yield all([
    (function*() {
      yield takeEvery(CREATE_NEW_CHARACTER_START, createNewCharacterSaga);
    })(),
    (function*() {
      yield takeEvery(FETCH_CHARACTER_INDEX_START, fetchCharacterIndexSaga);
    })()
  ]);
}
