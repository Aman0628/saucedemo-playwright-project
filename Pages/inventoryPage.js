const { expect } = require("@playwright/test");

class Inventory {
    constructor(page) {
        this.page = page;

        this.appLogo = page.locator(".app_logo");
        this.cartIcon = page.locator(".shopping_cart_container");
        this.title = page.locator(".title");
        this.products = page.locator(".inventory_item");
        this.productName = page.locator(".inventory_item_name");
        this.price = page.locator(".inventory_item_price");
        this.addToCart = page.getByRole("Button", { name: "Add to cart" });
        this.removeProduct = page.getByRole("Button", { name: "Remove" });
    }

    async verifyPageLoaded() {
        await expect(this.page).toHaveURL(/inventory.html/);
        await expect(this.appLogo).toHaveText("Swag Labs");
        await expect(this.title).toHaveText("Products");
        await expect(this.cartIcon).toBeVisible();
    }
    async verifyAllProductsDisplayed() {
        await expect(this.products).toHaveCount(6);
    }
    async verifyProductName() {
        const count = await (this.productName).count();

        for (let i = 0; i < count; i++) {
            await expect(this.productName.nth(i)).toBeVisible();
        }
    }
    async verifyProductPrice() {
        const count = await (this.price).count();

        for (let i = 0; i < count; i++) {
            await expect(this.price.nth(i)).toBeVisible();
        }
    }
    async addToCartProduct() {
        await (this.addToCart).first().click();
    }
    async removeProdcut() {
        await (this.removeProduct).first().click();
    }
}
module.exports = { Inventory };