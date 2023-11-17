import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const headerPath = "../partials/header.html";
const footerPath = "../partials/footer.html";
loadHeaderFooter(headerPath, footerPath);

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const position = "afterbegin";
const listing = new ProductList("tents", dataSource, element, position);

listing.init();
