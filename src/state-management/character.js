import { take, put, all, takeEvery } from "redux-saga/effects";

import { KeyValueService } from "api";

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
  activeCharacter: string,
  characterIndex: [string]
};

const INITIAL_STATE: State = {
  activeCharacter: "bruno",
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

export function* createNewCharacterSaga({ payload: { characterName } }) {
  try {
    yield KeyValueService.setValue(
      `character-index/${characterName}`,
      characterName
    );
    yield put(fetchCharacterIndex());
    // TODO: should really have a timeout, so it wont wait forever.
    yield take(FETCH_CHARACTER_INDEX_SUCCESS);
    yield put(setActiveCharacter(characterName));
  } catch (exception) {
    console.log("exception:", exception, "");
  }
}

export function* fetchCharacterIndexSaga() {
  // TODO: Must implement in search for prefix in API.
  yield put({ type: FETCH_CHARACTER_INDEX_SUCCESS });
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
