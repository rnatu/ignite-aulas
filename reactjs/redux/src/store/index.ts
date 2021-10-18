import { createStore, applyMiddleware } from "redux";
import combineReducers from "./modules/rootReducer";
import rootSaga from "./modules/rootSaga";

import createSagaMiddleware from "redux-saga";

import { ICartState } from "./modules/cart/types";

import { composeWithDevTools } from "redux-devtools-extension";

export interface IState {
  cart: ICartState;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(
  combineReducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store;
