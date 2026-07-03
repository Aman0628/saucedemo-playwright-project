class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = page.getByPlaceholder("Username");
        this.password = page.getByPlaceholder("Password");
        this.loginButton = page.getByRole("button", { name: "Login" });
    }

    async goTo() {
        await this.page.goto("https://www.saucedemo.com/");
    }

    async validateLogin(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}

module.exports = { LoginPage };