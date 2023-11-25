import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const headerPath = "../partials/header.html";
const footerPath = "../partials/footer.html";
loadHeaderFooter(headerPath, footerPath);

function renderWishlist() {
  const wishlistItems = getLocalStorage("wishlist") || [];
  const htmlItems = wishlistItems.map((item) => wishlistTemplate(item));
  document.querySelector(".wish-list").innerHTML = htmlItems.join("");
  // add event listener to x button
  const removeButtons = document.querySelectorAll(".removeFromWishlist");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () =>
      removeFromWishlist(button.dataset.id)
    );
  });
  const moveToCartButtons = document.querySelectorAll(".moveToCart");
  moveToCartButtons.forEach((button) => {
    button.addEventListener("click", () => moveToCart(button.dataset.id));
  });
}

function wishlistTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="/product_pages/index.html?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity"><span class="moveToCart" data-id="${item.Id}">🛒</span><span class="removeFromWishlist" data-id="${item.Id}">❌</span></p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function moveToCart(key) {
  // load up cart Items
  const cartItems = getLocalStorage("so-cart") || [];
  // check first if the item is found in the cart already, save the item and index for updating local storage
  const foundItem = cartItems.find((item) => item.Id === key);
  const foundItemIndex = cartItems.findIndex((item) => item.Id === key);
  if (foundItem) {
    cartItems[foundItemIndex].CartQuantity += 1;
    setLocalStorage("so-cart", cartItems);
  } else {
    // add a CartQuantity property to the product
    const wishlistItems = getLocalStorage("wishlist");
    const itemToMove = wishlistItems.find((item) => item.Id === key);
    itemToMove.CartQuantity = 1;
    // add this product to the cartItems array
    cartItems.push(itemToMove);
    // update the local storage with this array including the new product
    setLocalStorage("so-cart", cartItems);
  }
}

function removeFromWishlist(key) {
  // update the cart by removing the specified product
  const wishlistItems = getLocalStorage("wishlist");

  const updatedwishlistItems = wishlistItems.filter(
    (product) => product.Id != key
  );
  setLocalStorage("wishlist", updatedwishlistItems);

  renderWishlist();
}

renderWishlist();
