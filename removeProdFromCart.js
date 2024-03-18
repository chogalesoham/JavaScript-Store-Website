import { getCartProducts } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

export const removeProdFromCart = (id) => {
  let cartProducts = getCartProducts();
  cartProducts = cartProducts.filter((curProd) => curProd.id !== id);

  //update the lacalStrorage after removing the item
  localStorage.setItem("CartProductsLS", JSON.stringify(cartProducts));

  // to remove the cart on click

  let removeDiv = document.getElementById(`cart${id}`);
  if (removeDiv) {
    removeDiv.remove();
    showToast("delete", id);
  }

  updateCartValue(cartProducts);
};
