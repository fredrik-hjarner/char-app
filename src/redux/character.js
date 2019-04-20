/** *****************************************************************
    Constants
****************************************************************** */

const SET_ACTIVE_CHARACTER = "SET_ACTIVE_CHARACTER";

type State = {
  activeCharacter: string
};

const INITIAL_STATE: State = {
  activeCharacter: "bruno"
};

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

export const setActiveCharacter = (character: string) => {
  return { type: SET_ACTIVE_CHARACTER, payload: { character } };
};

/** *****************************************************************
    Selectors
****************************************************************** */

export const activeCharacterSelector = (state: Object): string =>
  state.character.activeCharacter;
