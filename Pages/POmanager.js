const { LoginPage } = require("../Pages/loginPage");
const { Inventory } = require("../Pages/inventoryPage");
// const { cartPage } = require("../Pages/addToCart");
// const { Checkout } = require("../Pages/checkout");

class POmanager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.inventory = new Inventory(page);
        // this.addToCart = new AddToCart(page);
        // this.checkout = new Checkout(page);
    }

    getmeLoginPage() {
        return this.loginPage;
    }
    getmeInventory() {
        return this.inventory;
    }

    getmeAddToCart() {
        return this.addToCart;
    }

    getmeCheckout() {
        return this.checkout;
    }
}

module.exports = { POmanager };