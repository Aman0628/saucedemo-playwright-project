const { test } = require("@playwright/test");
const { POmanager } = require("../../Pages/POmanager");

test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();

    const poManager = new POmanager(page);
    const inventory = poManager.getmeInventory();
});

test("verify Page successfully loaded", async ({ page }) => {
    const poManager = new POmanager(page);
    const inventory = poManager.getmeInventory();
    
    await inventory.verifyPageLoaded();
    await inventory.allProducts();
});