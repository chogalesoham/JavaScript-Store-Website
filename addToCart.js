import { getCartProducts } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

getCartProducts();

export const addToCart = (event, id, stock) => {
  let arrLocalStorageProduct = getCartProducts();

  const currentProdElem = document.querySelector(`#card${id}`);

  let quantity = currentProdElem.querySelector(".productQuantity").innerText;

  let price = currentProdElem.querySelector(".productPrice").innerText;

  // console.log(quantity, price);

  price = price.replace("₹", "");

  let existingProd = arrLocalStorageProduct.find(
    (curProd) => curProd.id === id
  );

  console.log(existingProd);

  if (existingProd && quantity > 1) {
    quantity = Number(existingProd.quantity) + Number(quantity);
    price = Number(price * quantity);
    let updatdCart = { id, quantity, price };

    updatdCart = arrLocalStorageProduct.map((curprod) => {
      return curprod.id === id ? updatdCart : curprod;
    });

    console.log(updatdCart);

    localStorage.setItem("CartProductsLS", JSON.stringify(updatdCart));
    showToast("add", id);
  }

  if (existingProd) {
    // alert("bhai dublicate he");
    return false;
  }

  price = Number(price * quantity);
  quantity = Number(quantity);

  // let updateCart = {id, quantity, price}
  arrLocalStorageProduct.push({ id, quantity, price });
  localStorage.setItem(
    "CartProductsLS",
    JSON.stringify(arrLocalStorageProduct)
  );

  updateCartValue(arrLocalStorageProduct);
  showToast("add", id);
};
