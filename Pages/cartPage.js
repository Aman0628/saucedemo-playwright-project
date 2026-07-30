const { expect } = require("@playwright/test");

class AddToCart {
    constructor(page) {
        this.page = page;
        this.cart = page.locator(".shopping_cart_link");
        this.cartBadge = page.locator(".shopping_cart_badge");

        // Cart page locators
        this.cartItems = page.locator(".cart_item");
        this.cartItemName = page.locator(".inventory_item_name");
        this.cartItemDesc = page.locator(".inventory_item_desc");
        this.cartItemPrice = page.locator(".inventory_item_price");
        this.cartItemQty = page.locator(".cart_quantity");
        this.continueShoppingButton = page.getByRole("button", { name: "Continue Shopping" });
        this.checkoutButton = page.getByRole("button", { name: "Checkout" });
    }

    async navigateToCart() {
        await this.cart.click();
    }

    async verifyOnCartPage() {
        await expect(this.page).toHaveURL(/cart.html/);
    }

    async verifyCartItemCount(expectedCount) {
        await expect(this.cartItems).toHaveCount(expectedCount);
    }

    async verifyProductInCart(productName) {
        await expect(this.cartItemName.filter({ hasText: productName })).toBeVisible();
    }

    async verifyProductNotInCart(productName) {
        await expect(this.cartItemName.filter({ hasText: productName })).toHaveCount(0);
    }

    async getCartItemDetails(productName) {
        const item = this.cartItems.filter({ hasText: productName });
        return {
            name: await item.locator(".inventory_item_name").textContent(),
            description: await item.locator(".inventory_item_desc").textContent(),
            price: await item.locator(".inventory_item_price").textContent(),
            quantity: await item.locator(".cart_quantity").textContent(),
        };
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async removeProductFromCart(productName) {
        const item = this.cartItems.filter({ hasText: productName });
        await item.getByRole("button", { name: "Remove" }).click();
    }

    async verifyCartEmpty() {
        await expect(this.cartItems).toHaveCount(0);
    }

    async verifyCartBadgeHidden() {
        await expect(this.cartBadge).toHaveCount(0);
    }
}

module.exports = { AddToCart };
