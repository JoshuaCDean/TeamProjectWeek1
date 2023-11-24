import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const headerPath = "../partials/header.html";
const footerPath = "../partials/footer.html";
loadHeaderFooter(headerPath, footerPath);

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  showTotal(cartItems);
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  // add event listener to x button
  const removeButtons = document.querySelectorAll(".removeFromCartButton");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => removeFromCart(button.dataset.id));
  });
  console.log(cartItems);
  redirectCheckout();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${
    item.CartQuantity
  } <span class="removeFromCartButton" data-id="${item.Id}">❌</span></p>
  <p class="cart-card__price">$${item.FinalPrice * item.CartQuantity}</p>
</li>`;

  return newItem;
}

function removeFromCart(key) {
  // update the cart by removing the specified product
  const cartItems = getLocalStorage("so-cart");

  const updatedCartItems = cartItems.filter((product) => product.Id != key);
  setLocalStorage("so-cart", updatedCartItems);

  renderCartContents();
}

function showTotal(cartItems) {
  if (cartItems.length > 0) {
    const cartFooter = document.querySelector(".cart-footer");

    cartFooter.classList.remove("hide");

    const totalPrice = cartItems.reduce(
      (total, cartItem) => total + cartItem.FinalPrice * cartItem.CartQuantity,
      0
    );

    const cartTotal = document.querySelector(".cart-total");
    cartTotal.textContent = `Total: $${totalPrice}`;
  }
}

function redirectCheckout() {
  const checkoutBtn = document.querySelector(".checkoutBtn");
  checkoutBtn.onclick = function () {
    location.href = "../checkout/index.html";
  };
}

renderCartContents();
