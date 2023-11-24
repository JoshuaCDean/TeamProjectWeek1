import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
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
  const simplifiedItems = items.map(item => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.CartQuantity,  
    }));
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
    // packageItems(this.list);
  }

  calculateItemSummary() {
      const subTotalElement = document.querySelector(this.outputSelector + ` #cartTotal`);
    // calculate and display the total amount of the items in the cart, and the number of items.
      this.subTotal = this.list.reduce((total, item) => 
          total + item.FinalPrice * item.CartQuantity, 0
      );

      subTotalElement.innerHTML = `$${this.subTotal.toFixed(2)}`;

      this.itemTotal = this.list.reduce((total, item) =>
          total + item.CartQuantity, 0
      );

      const itemTotalElement = document.querySelector(this.outputSelector + ` #num-items`);
      itemTotalElement.innerHTML = this.itemTotal
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
      const shipping = document.querySelector(this.outputSelector + " #shipping");
      const tax = document.querySelector(this.outputSelector + " #tax");
      const orderTotal = document.querySelector(this.outputSelector + " #orderTotal");

      shipping.innerText = "$" + this.shipping.toFixed(2);
      tax.innerText = "$" + this.tax.toFixed(2);
      orderTotal.innerHTML = "$" + this.orderTotal.toFixed(2);
  }


  async checkout() {
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form
    const formElement = document.forms["checkout"];
    
    const json = formDataToJSON(formElement);
    
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);

    console.log(json);

 
    
    // call the checkout method in our ExternalServices module and send it our data object.
    try {
      const res = await services.checkout(json);
      console.log(res);
      // the following won't work since there is an error with this request
      if (res.ok) {
         // empty cart
        setLocalStorage("so-cart", []);

        // redirect to success page
        window.location.href = "success.html";
  
      }

    } catch(error) {
      alertMessage(error.message);
      throw new Error("Error during checkout:", error.message);
    }
  }
}
  