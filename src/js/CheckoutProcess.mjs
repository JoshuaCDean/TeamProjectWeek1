import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}
// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.CartQuantity,  
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.subTotal = 0;
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
    this.calculateOrdertotal();
    packageItems(this.list);
  }

  calculateItemSummary() {
      const summaryElement = document.querySelector(this.outputSelector + ` #subtotal`);
    // calculate and display the total amount of the items in the cart, and the number of items.
      this.subTotal = this.list.reduce((total, item) => 
          total + item.FinalPrice * item.CartQuantity, 0
      );

      summaryElement.innerHTML = this.subTotal;

      this.itemTotal = this.list.reduce((total, item) =>
          total + item.CartQuantity, 0
      );
  }

  calculateOrdertotal() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
      this.tax = this.subTotal * .06;
      this.shipping = 10 + 2 * (this.itemTotal - 1);

      this.orderTotal = this.subTotal + this.tax + this.shipping;
    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
      const shipping = document.querySelector("#shipping");
      const tax = document.querySelector("#tax");
      const total = document.querySelector("#totalBill");

      shipping.innerHTML = `$${this.shipping.toFixed(2)}`;
      tax.innerHTML = `$${this.tax.toFixed(2)}`;
      total.innerHTML = `$${this.orderTotal.toFixed(2)}`;
  }


  async checkout() {
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form
    const formElement = document.forms["checkout"];
    
    const json = formDataToJSON(formElement);
    
    json.orderDate = new Date();
    json.totalBill = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);
    
    // call the checkout method in our ExternalServices module and send it our data object.
    try {
      const res = await services.checkout(json);
      console.log(res);
    } catch(err) {
      console.log(err);
    }
  }
}
  