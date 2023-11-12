import renderListWithTemplate from "./utils.mjs";

function createTemplate(product){
  return `<li class="product-card">
  <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a
    >
  </li>`
}

function filterList(product){
    return product.Id !== "989CG" && product.Id !== "880RT";
}



export default class ProductList {
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init(){
        const list = await this.dataSource.getData();
        this.renderList(list)
    }

    renderList(list){
      const filteredList = list.filter(filterList);
      renderListWithTemplate(createTemplate, this.listElement, filteredList);
    }
}