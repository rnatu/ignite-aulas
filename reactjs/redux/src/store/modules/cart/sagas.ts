import { all, takeLatest, select, call, put } from "redux-saga/effects";
import {
  addProductToCartFailure,
  addProductToCartRequest,
  addProductToCartSuccess,
} from "./actions";
import { IState } from "../../index";
import { AxiosResponse } from "axios";
import api from "../../../services/api";

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface IStockResponse {
  id: number;
  quantity: number;
}

//o saga necessita de funções geradoras para trabalhar com os métodos do redux-saga/effects
//todos os métodos do redux-saga/effects que forem ser utilizados dentro da função geradora vão necessitar do yield antes
function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload;

  //buscando informações do estado e fazendo um find
  //funciona como um useSelector, só que no saga
  const currentQuantity: number = yield select((state: IState) => {
    return (
      state.cart.items.find((item) => item.product.id === product.id)
        ?.quantity ?? 0
    );
  });

  console.log("CurrentQuantity (Saga verification) - " + currentQuantity);

  //get com axios no saga
  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(
    api.get,
    `stock/${product.id}`
  );

  if (availableStockResponse.data.quantity > currentQuantity) {
    //put funciona como o dispatch, só que no saga
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }
}

// primeiro parametro é a action, e o segundo a função a ser executada como middleware
export default all([
  takeLatest("ADD_PRODUCT_TO_CART_REQUEST", checkProductStock),
]);
