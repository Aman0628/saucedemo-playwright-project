const { test } = require("../../fixtures/login.fixture");

test("verify Page successfully loaded", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();

    await inventory.verifyPageLoaded();
    await inventory.verifyAllProductsDisplayed();
    await inventory.verifyProductName();
    await inventory.verifyProductPrice();
    await inventory.addToCartProduct();
    await inventory.removeFirstProduct();
});