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
  <p class="cart-card__quantity"><span class="removeFromWishlist" data-id="${item.Id}">❌</span></p>
</li>`;

  return newItem;
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
