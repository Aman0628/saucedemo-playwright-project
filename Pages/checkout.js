class Checkout {
    constructor(page) {
        this.page = page;
    }

    async checkout() {
        await this.page.getByRole("button", { name: "Checkout" }).click();
        await this.page.getByPlaceholder("First Name").fill("Aman");
        await this.page.getByPlaceholder("Last Name").fill("Kumar");
        await this.page.getByPlaceholder("Zip/Postal Code").fill("453441");
        await this.page.getByRole("button", { name: "Continue" }).click();
        await this.page.getByRole("button", { name: "Finish" }).click();
    }
}

module.exports = { Checkout };
