const { LoginPage } = require("../Pages/loginPage");
const { Inventory } = require("../Pages/inventoryPage");
const { AddToCart } = require("../Pages/cartPage");
const { Checkout } = require("../Pages/checkoutInfoPage");
const { CheckoutOverview } = require("../Pages/checkoutOverviewPage");
const { OrderComplete } = require("../Pages/orderCompletePage");
const { Menu } = require("../Pages/menuPage");

class POmanager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.inventory = new Inventory(page);
        this.cart = new AddToCart(page);
        this.checkoutInfo = new Checkout(page);
        this.checkoutOverview = new CheckoutOverview(page);
        this.orderComplete = new OrderComplete(page);
        this.menu = new Menu(page);
    }

    getmeLoginPage() {
        return this.loginPage;
    }
    getmeInventory() {
        return this.inventory;
    }
    getmeCart() {
        return this.cart;
    }
    getmeCheckoutInfo() {
        return this.checkoutInfo;
    }
    getmeCheckoutOverview() {
        return this.checkoutOverview;
    }
    getmeOrderComplete() {
        return this.orderComplete;
    }
    getmeMenu() {
        return this.menu;
    }
}

module.exports = { POmanager };
