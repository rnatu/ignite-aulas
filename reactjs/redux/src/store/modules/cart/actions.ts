import { IProduct } from "./types";

export function addProductToCart(product: IProduct) {
  return {
    type: "ADD_PRODUCT_TO_CART", //! obrigatório, identifica cada uma das ações
    payload: { //geralmente são os parametros recebidos
      product,
    },
  };
}
