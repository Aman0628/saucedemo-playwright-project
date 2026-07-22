const { expect } = require("@playwright/test");

class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = page.getByPlaceholder("Username");
        this.password = page.getByPlaceholder("Password");
        this.loginButton = page.getByRole("button", { name: "Login" });
        this.errorMessage = page.locator(".error-message-container");
    }

    async goTo() {
        await this.page.goto("https://www.saucedemo.com/");
    }

    async validateLogin(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
    async verifySuccessfulLogin() {
        await expect(this.page).toHaveURL(/inventory.html/);
        await expect(this.page.locator(".title")).toHaveText("Products");
    }

    async verifyErrorMessage(expectedMessage) {
        await expect(this.errorMessage).toContainText(expectedMessage);
    }
}
module.exports = { LoginPage };