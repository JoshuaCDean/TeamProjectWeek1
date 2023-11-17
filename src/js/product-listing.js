import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

const headerPath = "../partials/header.html";
const footerPath = "../partials/footer.html";
loadHeaderFooter(headerPath, footerPath);

const category = getParam("category");
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const myList = new ProductList(category, dataSource, listElement, "afterbegin");

myList.init();

// make title page dynamic
const title = document.querySelector("#list-page-title");
title.innerHTML = `Top Products: <span style="text-transform: capitalize">${category}</span>`;

// const position = "afterbegin";
// const listing = new ProductList("tents", dataSource, element, position);

// listing.init();
