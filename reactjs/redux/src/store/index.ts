import { createStore } from "redux";
import { ICartState } from "./modules/cart/types";

import { composeWithDevTools } from "redux-devtools-extension";

import combineReducers from "./modules/rootReducer";

export interface IState {
  cart: ICartState;
}

const store = createStore(combineReducers, composeWithDevTools());

export default store;
