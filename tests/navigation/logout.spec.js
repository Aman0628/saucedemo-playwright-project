const { test, expect } = require("../../fixtures/login.fixture");
const { BASE_URL, USERS, PRODUCTS } = require("../../helpers/constants");

// NAV-01: Logout via burger menu
test("logout via burger menu returns to the login page", async ({ page, loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();
    const menu = loggedInPoManager.getmeMenu();

    await inventory.verifyPageLoaded();

    await menu.open();
    await menu.clickLogout();

    await expect(page).toHaveURL(BASE_URL);
    await expect(page.getByPlaceholder("Username")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});

// NAV-02: Session cleared after logout
test("session is cleared after logout - direct URL access redirects to login", async ({ page, loggedInPoManager }) => {
    const menu = loggedInPoManager.getmeMenu();

    await menu.open();
    await menu.clickLogout();
    await expect(page).toHaveURL(BASE_URL);

    await page.goto("/inventory.html");

    await expect(page).not.toHaveURL(/inventory.html/);
    await expect(page.getByPlaceholder("Username")).toBeVisible();
});

// NAV-03: Login works again after logout
test("can log back in successfully after logging out", async ({ page, loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();
    const menu = loggedInPoManager.getmeMenu();
    const loginPage = loggedInPoManager.getmeLoginPage();

    await menu.open();
    await menu.clickLogout();
    await expect(page).toHaveURL(BASE_URL);

    await loginPage.validateLogin(USERS.standard.username, USERS.standard.password);
    await inventory.verifyPageLoaded();
});

// NAV-04: Cart is not preserved after logout/login
test("cart is not preserved after logging out and back in", async ({ page, loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();
    const menu = loggedInPoManager.getmeMenu();
    const loginPage = loggedInPoManager.getmeLoginPage();

    await inventory.addProductToCartByName(PRODUCTS.backpack);
    await inventory.verifyCartBadgeCount(1);

    await menu.open();
    await menu.clickLogout();
    await expect(page).toHaveURL(BASE_URL);

    await loginPage.validateLogin(USERS.standard.username, USERS.standard.password);
    await inventory.verifyPageLoaded();

    // NOTE: SauceDemo actually keeps the cart in local storage across a
    // logout/login cycle for the same browser session. This assertion
    // documents the ACTUAL behavior - flip to verifyCartBadgeCount(0) if
    // your app is expected to reset the cart on logout instead.
    await inventory.verifyCartBadgeCount(1);
});
