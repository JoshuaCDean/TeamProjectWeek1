import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const headerPath = "../partials/header.html";
const footerPath = "../partials/footer.html";
loadHeaderFooter(headerPath, footerPath);

const myCheckout = new CheckoutProcess("so-cart", ".orderSummary");
myCheckout.init();

document
    .querySelector("#zip")
    .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));

document
    .querySelector("#checkoutSubmit").addEventListener("click", (e) => {
        e.preventDefault();

        myCheckout.checkout();
    });