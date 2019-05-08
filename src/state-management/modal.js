// @flow

// ------------------------------------
// Constants
// ------------------------------------

const OPEN_MODAL = "modal:open";
const CLOSE_MODAL = "modal:close";

// ------------------------------------
// Type definitions
// ------------------------------------

type ModalActions = [
  {
    text: string,
    color: string,
    actionToDispatch: Function
  }
];

type Modal = {
  title: string,
  text: string,
  actions: ModalActions
};

type State = {
  modal: Modal | null
};

// ------------------------------------
// Actions
// ------------------------------------

export const openModal = (payload: Modal) => ({ type: OPEN_MODAL, payload });
export const closeModal = () => ({ type: CLOSE_MODAL });

// ------------------------------------
// Selectors
// ------------------------------------

export const getModal = state => state.modal.modal;

// ------------------------------------
// Reducers
// ------------------------------------

const INITIAL_STATE = {
  modal: null
};

export const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        modal: action.payload
      };

    case CLOSE_MODAL:
      return INITIAL_STATE;

    default:
      return state;
  }
};
