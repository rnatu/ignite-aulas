import { Reducer } from "react";
import { ICartState } from "./types";

const INITIAL_STATE: ICartState = {
  items: [],
};

const cart: Reducer<ICartState, null> = (state, action) => {
  console.log(state, action);

  return INITIAL_STATE;
};

export default cart;
