import { createStore } from "redux";
import { ICartState } from "./modules/cart/types";
import combineReducers from './modules/rootReducer';

export interface IState {
  cart: ICartState;
}

const store = createStore(combineReducers);

export default store;
