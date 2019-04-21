import { take, put, all, takeEvery } from "redux-saga/effects";
import { last, dropLast } from "ramda";

import { KeyValueService } from "api";

/** *****************************************************************
    Constants
****************************************************************** */

const PUSH_ROUTE = "PUSH_ROUTE";
const GO_BACK = "GO_BACK";

type State = {
  currentRoute: string,
  routeHistory: [string]
};

const INITIAL_STATE: State = {
  currentRoute: "Home",
  routeHistory: [],
};

/** *****************************************************************
    Reducer
****************************************************************** */

export const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case PUSH_ROUTE:
      return {
        ...state,
        currentRoute: action.payload.route,
        routeHistory: [...state.routeHistory, action.payload.route],
      };

    case GO_BACK: {
      const routeHistory = dropLast(1, state.routeHistory);
      return {
        ...state,
        currentRoute: last(routeHistory),
        routeHistory,
      };
    }

    default:
      return state;
  }
};

/** *****************************************************************
    Actions
****************************************************************** */

export const pushRoute = (route: string) => ({
  type: PUSH_ROUTE,
  payload: { route },
});

export const goBack = () => ({ type: GO_BACK });

/** *****************************************************************
    Selectors
****************************************************************** */

export const currentRouteSelector = (state: Object): string => state.navigation.currentRoute;

/** *****************************************************************
    Sagas
****************************************************************** */
