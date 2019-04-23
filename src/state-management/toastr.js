import { delay, put, all, takeEvery } from "redux-saga/effects";

// ------------------------------------
// Constants
// ------------------------------------

export const OPEN_TOASTR = "toastr:open";
const CLOSE_TOASTR = "toastr:close";

// Toastr types
export const TOASTR_SUCCESS = "TOASTR_SUCCESS";
export const TOASTR_ERROR = "TOASTR_ERROR";

// ------------------------------------
// Type definitions
// ------------------------------------

type Action = {
  type: string,
  payload: any
};

type State = {
  toastr: {
    text: string,
    type?: string
  } | null
};

type Payload = {
  text: string,
  type?: string
};

// ------------------------------------
// Actions
// ------------------------------------

export const openToastr = ({ text, type = TOASTR_SUCCESS }: Payload) => ({
  type: OPEN_TOASTR,
  payload: { type, text }
});

export const closeToastr = () => ({ type: CLOSE_TOASTR });

// ------------------------------------
// Selectors
// ------------------------------------

export const getToastr = state => state.toastr.toastr;

// ------------------------------------
// Reducers
// ------------------------------------

const INITIAL_STATE: State = {
  /**
   * null indicates there is no toastr
   * that is that the toastr is closed.
   */
  toastr: null
};

export const reducer = (state: State = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case OPEN_TOASTR: {
      const { text, type } = action.payload;
      return { toastr: { text, type } };
    }

    case CLOSE_TOASTR:
      return INITIAL_STATE;

    default:
      return state;
  }
};

/** *****************************************************************
    Sagas
****************************************************************** */

function* closeToastrSaga() {
  yield delay(5000);
  yield put(closeToastr());
}

export function* sagas() {
  yield all([
    (function*() {
      yield takeEvery(OPEN_TOASTR, closeToastrSaga);
    })()
  ]);
}
