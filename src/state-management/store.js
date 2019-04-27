import { compose, createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import {
  reducer as characterReducer,
  sagas as characterSagas
} from "./character";
import {
  reducer as abilitiesReducer,
  sagas as abilitiesSagas
} from "./abilities";
import { reducer as navigationReducer } from "./navigation";
import { reducer as hpReducer, sagas as hpSagas } from "./hp";
import { reducer as acReducer, sagas as acSagas } from "./ac";
import { reducer as weaponsReducer, sagas as weaponsSagas } from "./weapons";
import { reducer as toastrReducer, sagas as toastrSagas } from "./toastr";
import { reducer as eqReducer, sagas as eqSagas } from "./eq";
import { reducer as infoReducer, sagas as infoSagas } from "./info";

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //eslint-disable-line

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

if (__DEV__) {
  middleware.push(createLogger({ collapsed: true }));
}

const transformImages = createTransform(
  inboundState => {
    if (!inboundState) {
      return {};
    }
    return inboundState;
  },

  outboundState => {
    if (!outboundState) {
      return {};
    }
    return outboundState;
  },

  { whitelist: ["images"] }
);

const persistConfig = {
  transforms: [transformImages],
  key: "root",
  storage,
  whitelist: ["images"]
};

const reducers = combineReducers({
  character: characterReducer,
  navigation: navigationReducer,
  abilities: abilitiesReducer,
  hp: hpReducer,
  ac: acReducer,
  weapons: weaponsReducer,
  toastr: toastrReducer,
  eq: eqReducer,
  info: infoReducer
});

export const store = createStore(
  persistReducer(persistConfig, reducers),
  enhancer(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

function* rootSaga() {
  yield all([
    characterSagas(),
    abilitiesSagas(),
    hpSagas(),
    acSagas(),
    weaponsSagas(),
    toastrSagas(),
    eqSagas(),
    infoSagas()
  ]);
}

sagaMiddleware.run(rootSaga);
