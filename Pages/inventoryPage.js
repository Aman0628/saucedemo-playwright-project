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
        this.removeProductButton = page.getByRole("Button", { name: "Remove" });
        this.cartBadge = page.locator(".shopping_cart_badge");
        this.backToProductsButton = page.getByRole("button", { name: "Back to products" });
        this.sortDropdown = page.locator("[data-test='product-sort-container']");
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
    async removeFirstProduct() {
        await (this.removeProductButton).first().click();
    }

    async addProductToCartByName(productName) {
        const count = await this.products.count();

        for (let i = 0; i < count; i++) {
            const title = await this.products
                .nth(i)
                .locator(".inventory_item_name")
                .textContent();

            if (title === productName) {
                await this.products
                    .nth(i)
                    .getByRole("button", { name: "Add to cart" })
                    .click();
                return;
            }
        }
        throw new Error(`Product "${productName}" not found on inventory page`);
    }

    async addAllProductsToCart() {
        const count = await this.products.count();

        for (let i = 0; i < count; i++) {
            await this.products
                .nth(i)
                .getByRole("button", { name: "Add to cart" })
                .click();
        }
    }

    async verifyCartBadgeCount(expectedCount) {
        if (expectedCount === 0) {
            await expect(this.cartBadge).toHaveCount(0);
        } else {
            await expect(this.cartBadge).toHaveText(String(expectedCount));
        }
    }

    async openProductDetail(productName) {
        await this.productName.filter({ hasText: productName }).click();
    }

    async verifyOnProductDetailPage(productName) {
        await expect(this.page).toHaveURL(/inventory-item.html/);
        await expect(this.page.locator(".inventory_details_name")).toHaveText(productName);
    }

    async addToCartFromDetailPage() {
        await this.addToCart.click();
    }

    async goBackToProducts() {
        await this.backToProductsButton.click();
    }

    async removeProductByName(productName) {
        const count = await this.products.count();

        for (let i = 0; i < count; i++) {
            const title = await this.products
                .nth(i)
                .locator(".inventory_item_name")
                .textContent();

            if (title === productName) {
                await this.products
                    .nth(i)
                    .getByRole("button", { name: "Remove" })
                    .click();
                return;
            }
        }
        throw new Error(`Product "${productName}" not found on inventory page`);
    }

    async verifyProductButtonShowsAddToCart(productName) {
        const item = this.products.filter({ has: this.page.locator(".inventory_item_name", { hasText: productName }) });
        await expect(item.getByRole("button", { name: "Add to cart" })).toBeVisible();
    }

    async verifyProductButtonShowsRemove(productName) {
        const item = this.products.filter({ has: this.page.locator(".inventory_item_name", { hasText: productName }) });
        await expect(item.getByRole("button", { name: "Remove" })).toBeVisible();
    }

    // value can be one of: "az", "za", "lohi", "hilo"
    async sortBy(value) {
        await this.sortDropdown.selectOption(value);
    }

    async getSelectedSortOption() {
        return this.sortDropdown.inputValue();
    }

    async getDisplayedProductNames() {
        return this.productName.allTextContents();
    }

    async getDisplayedProductPrices() {
        const prices = await this.price.allTextContents();
        return prices.map((p) => parseFloat(p.replace("$", "")));
    }
}
module.exports = { Inventory };