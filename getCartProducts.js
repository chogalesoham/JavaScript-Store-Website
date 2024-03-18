import { updateCartValue } from "./updateCartValue";

export const getCartProducts = () => {
  let cartProducts = localStorage.getItem("CartProductsLS");

  if (!cartProducts) {
    return [];
  }

  cartProducts = JSON.parse(cartProducts);

  updateCartValue(cartProducts);
  return cartProducts;
};
