const { expect } = require("@playwright/test");

class CheckoutOverview {
    constructor(page) {
        this.page = page;

        this.cartItems = page.locator(".cart_item");
        this.itemName = page.locator(".inventory_item_name");
        this.itemPrice = page.locator(".inventory_item_price");
        this.itemTotalLabel = page.locator(".summary_subtotal_label");
        this.taxLabel = page.locator(".summary_tax_label");
        this.totalLabel = page.locator(".summary_total_label");
        this.finishButton = page.getByRole("button", { name: "Finish" });
        this.cancelButton = page.getByRole("button", { name: "Cancel" });
    }

    async verifyOnCheckoutOverviewPage() {
        await expect(this.page).toHaveURL(/checkout-step-two.html/);
    }

    async verifyItemCount(expectedCount) {
        await expect(this.cartItems).toHaveCount(expectedCount);
    }

    async verifyProductInOverview(productName) {
        await expect(this.itemName.filter({ hasText: productName })).toBeVisible();
    }

    async getItemPrices() {
        const prices = await this.itemPrice.allTextContents();
        return prices.map((p) => parseFloat(p.replace("$", "")));
    }

    async getItemTotal() {
        const text = await this.itemTotalLabel.textContent();
        return parseFloat(text.replace("Item total: $", ""));
    }

    async getTax() {
        const text = await this.taxLabel.textContent();
        return parseFloat(text.replace("Tax: $", ""));
    }

    async getTotal() {
        const text = await this.totalLabel.textContent();
        return parseFloat(text.replace("Total: $", ""));
    }

    async clickFinish() {
        await this.finishButton.click();
    }

    async clickCancel() {
        await this.cancelButton.click();
    }
}

module.exports = { CheckoutOverview };
