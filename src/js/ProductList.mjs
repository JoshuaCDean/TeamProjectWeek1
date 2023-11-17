import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="Image of ${product.NameWithoutBrand}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>`
}

export default class ProductListing {
    constructor(category, dataSource, listElement, position) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.position = position;
    }

    async init() {
        // get the complete list from json
        const list = await this.dataSource.getData(this.category);
        // set this rendered list to easily manipulate in the future
        const renderedList = list;
        renderListWithTemplate(productCardTemplate, this.listElement, renderedList, this.position, "false");
    }
}

