 class AddToCart {
    constructor(page) {
        this.page = page;
        this.products = page.locator(".inventory_item");
        this.cart = page.locator(".shopping_cart_link");
    }

    async searchProduct(productName) {
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
                break;
            }
        }
    }

    async navigateToCart() {
        await this.cart.click();
    }
}

module.exports = { AddToCart };