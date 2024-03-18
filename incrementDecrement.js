import { getCartProducts } from "./getCartProducts";
import { updateCartProductTotal } from "./updateCartProductTotal";

export const incrementDecrement = (event, id, stock, price) => {
  const currentCardElement = document.querySelector(`#cart${id}`);

  const productQuantity = currentCardElement.querySelector(".productQuantity");
  const productPrice = currentCardElement.querySelector(".productPrice");

  let quantity = 1;
  let localStoragePrice = 0;

  let LocalCartProducts = getCartProducts();
  let existingProd = LocalCartProducts.find((curProd) => curProd.id === id);

  if (existingProd) {
    quantity = existingProd.quantity;
    localStoragePrice = existingProd.price;
  } else {
    localStoragePrice = price;
    price = price;
  }

  if (event.target.className === "cartIncrement") {
    if (quantity < stock) {
      quantity = quantity + 1;
    } else if (quantity === stock) {
      quantity = stock;
      localStoragePrice = price * stock;
    }
  }

  if (event.target.className === "cartDecrement") {
    if (quantity > 1) {
      quantity -= 1;
    }
  }

  localStoragePrice = price * quantity;
  localStoragePrice = Number(localStoragePrice.toFixed(2));

  let updatdCart = { id, quantity, price: localStoragePrice };

  updatdCart = LocalCartProducts.map((curprod) => {
    return curprod.id === id ? updatdCart : curprod;
  });

  // console.log(updatdCart);

  localStorage.setItem("CartProductsLS", JSON.stringify(updatdCart));

  productQuantity.innerText = quantity;
  productPrice.innerText = localStoragePrice;

  updateCartProductTotal();
};
