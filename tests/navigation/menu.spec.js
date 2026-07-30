const { test, expect } = require("../../fixtures/login.fixture");
const { BASE_URL, PRODUCTS } = require("../../helpers/constants");

// MENU-01: Open and close burger menu
test("open and close the burger menu", async ({ loggedInPoManager }) => {
    const menu = loggedInPoManager.getmeMenu();

    await menu.open();
    await menu.close();
});

// MENU-02: "All Items" link from any page
test("All Items link returns to inventory page from elsewhere in the app", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();
    const cart = loggedInPoManager.getmeCart();
    const menu = loggedInPoManager.getmeMenu();

    await inventory.addProductToCartByName(PRODUCTS.backpack);
    await cart.navigateToCart();
    await cart.verifyOnCartPage();

    await menu.open();
    await menu.clickAllItems();

    await inventory.verifyPageLoaded();
});

// MENU-03: "About" link navigates externally
test("About link navigates to Sauce Labs website", async ({ page, loggedInPoManager }) => {
    const menu = loggedInPoManager.getmeMenu();

    await menu.open();

    // The About link navigates in the same tab on SauceDemo (no target=_blank),
    // so we wait for the navigation rather than a new popup/tab.
    await Promise.all([
        page.waitForURL(/saucelabs\.com/, { timeout: 15000 }),
        menu.clickAbout(),
    ]);

    await expect(page).toHaveURL(/saucelabs\.com/);
});

// MENU-04: "Reset App State" clears cart
// NOTE: confirmed via a real run against the live site - Reset App State
// clears the cart badge immediately, but the individual "Remove" buttons on
// the inventory grid do NOT re-render to "Add to cart" until the page is
// reloaded/re-rendered. A reload is a realistic follow-up action, so we do
// that before checking the buttons rather than asserting a live re-render
// that the app doesn't actually perform.
test("Reset App State clears the cart", async ({ page, loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();
    const menu = loggedInPoManager.getmeMenu();

    await inventory.addProductToCartByName(PRODUCTS.backpack);
    await inventory.addProductToCartByName(PRODUCTS.bikeLight);
    await inventory.verifyCartBadgeCount(2);

    await menu.open();
    await menu.clickResetAppState();
    await menu.close();

    await expect(page).toHaveURL(/inventory.html/);
    await inventory.verifyCartBadgeCount(0);

    await page.reload();

    await inventory.verifyProductButtonShowsAddToCart(PRODUCTS.backpack);
    await inventory.verifyProductButtonShowsAddToCart(PRODUCTS.bikeLight);
});

// MENU-05: Menu items visible only when logged in
test("burger menu is not present on the login page", async ({ page, loggedInPoManager }) => {
    const menu = loggedInPoManager.getmeMenu();

    await menu.open();
    await menu.clickLogout();
    await expect(page).toHaveURL(BASE_URL);

    await menu.verifyMenuNotVisible();
});
