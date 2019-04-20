import { compose, createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { reducer as characterReducer } from "./character";

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //eslint-disable-line
const middleware = [];

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
  character: characterReducer
});

export const store = createStore(
  persistReducer(persistConfig, reducers),
  enhancer(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
