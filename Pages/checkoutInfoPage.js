const { expect } = require("@playwright/test");

class Checkout {
    constructor(page) {
        this.page = page;

        this.firstNameInput = page.getByPlaceholder("First Name");
        this.lastNameInput = page.getByPlaceholder("Last Name");
        this.zipInput = page.getByPlaceholder("Zip/Postal Code");
        this.continueButton = page.getByRole("button", { name: "Continue" });
        this.cancelButton = page.getByRole("button", { name: "Cancel" });
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async verifyOnCheckoutStepOne() {
        await expect(this.page).toHaveURL(/checkout-step-one.html/);
    }

    async fillInfo(firstName, lastName, zip) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipInput.fill(zip);
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async clickCancel() {
        await this.cancelButton.click();
    }

    async getErrorMessage() {
        return this.errorMessage.textContent();
    }

    async verifyErrorMessage(expectedMessage) {
        await expect(this.errorMessage).toContainText(expectedMessage);
    }

    // Convenience method for the happy-path flow: fills valid info and continues
    async fillValidInfoAndContinue(firstName = "Aman", lastName = "Kumar", zip = "453441") {
        await this.fillInfo(firstName, lastName, zip);
        await this.clickContinue();
    }
}

module.exports = { Checkout };
