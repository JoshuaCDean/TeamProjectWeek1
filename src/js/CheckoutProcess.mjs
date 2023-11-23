import { getLocalStorage } from "./utils.mjs";

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

  }

  