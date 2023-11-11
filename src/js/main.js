import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import Alert from "./Alert";

const dataSource = new ProductData("tents")
const element = document.querySelector(".product-list");
const pList = new ProductListing("none", dataSource, element);
pList.init();


const alertParent = document.querySelector("main");
const aList = new Alert(alertParent);

aList.init();