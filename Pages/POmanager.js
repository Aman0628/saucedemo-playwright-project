const { LoginPage } = require("../Pages/loginPage");
const { AddToCart } = require("../Pages/addToCart");
const { Checkout } = require("../Pages/checkout");

class POmanager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.addToCart = new AddToCart(page);
        this.checkout = new Checkout(page);
    }

    getmeLoginPage() {
        return this.loginPage;
    }

    getmeAddToCart() {
        return this.addToCart;
    }

    getmeCheckout() {
        return this.checkout;
    }
}

module.exports = { POmanager };