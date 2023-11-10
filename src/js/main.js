import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const position = "afterbegin";
const listing = new ProductList("tents", dataSource, element, position);

listing.init();
