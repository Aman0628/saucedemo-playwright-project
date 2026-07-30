const { expect } = require("@playwright/test");

class OrderComplete {
    constructor(page) {
        this.page = page;

        this.completeHeader = page.locator(".complete-header");
        this.completeText = page.locator(".complete-text");
        this.backHomeButton = page.getByRole("button", { name: "Back Home" });
        this.ponyExpressImage = page.locator(".pony_express");
    }

    async verifyOnOrderCompletePage() {
        await expect(this.page).toHaveURL(/checkout-complete.html/);
    }

    async verifyOrderCompleteMessage() {
        await expect(this.completeHeader).toHaveText("Thank you for your order!");
        await expect(this.ponyExpressImage).toBeVisible();
    }

    async clickBackHome() {
        await this.backHomeButton.click();
    }
}

module.exports = { OrderComplete };
