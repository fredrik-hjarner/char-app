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
  toastr: [
    {
      text: string,
      type?: string
    }
  ]
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

export const getToastrs = (state: Object): [Object] => state.toastr.toastr;

// ------------------------------------
// Reducers
// ------------------------------------

const INITIAL_STATE: State = {
  toastr: []
};

export const reducer = (state: State = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case OPEN_TOASTR: {
      const { text, type } = action.payload;
      return { toastr: [...state.toastr, { text, type }] };
    }

    case CLOSE_TOASTR: {
      const [_, ...toastr] = state.toastr;
      return { toastr };
    }
    default:
      return state;
  }
};

/** *****************************************************************
    Sagas
****************************************************************** */

function* closeToastrSaga() {
  yield delay(8000);
  yield put(closeToastr());
}

export function* sagas() {
  yield all([
    (function*() {
      yield takeEvery(OPEN_TOASTR, closeToastrSaga);
    })()
  ]);
}
