const { expect } = require("@playwright/test");

class Inventory {
    constructor(page) {
        this.page = page;

        this.appLogo = page.locator(".app_logo");
        this.cartIcon = page.locator(".shopping_cart_container");
        this.title = page.locator(".title");
        this.products = page.locator(".inventory_item");
    }

    async verifyPageLoaded() {
        await expect(this.page).toHaveURL(/inventory.html/);
        await expect(this.appLogo).toHaveText("Swag Labs");
        await expect(this.title).toHaveText("Products");
        await expect(this.cartIcon).toBeVisible();
    }
    async allProducts() {
        await expect(this.products).toHaveCount(6);
        const productNames = this.page.locator('.inventory_item_name');

        const count = await productNames.count();

        for (let i = 0; i < count; i++) {
            await expect(productNames.nth(i)).toBeVisible();
        }
    }
}
module.exports = { Inventory };