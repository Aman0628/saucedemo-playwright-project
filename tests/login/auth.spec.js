const { test, expect } = require("../../fixtures/login.fixture");
const { BASE_URL, USERS } = require("../../helpers/constants");

// ─────────────────────────────────────────────────────────────────────────────
// AUTH-01: Locked-out user is denied access with the correct error message
// ─────────────────────────────────────────────────────────────────────────────
test("locked_out_user sees a locked-out error message", async ({ poManager }) => {
    const loginPage = poManager.getmeLoginPage();

    await loginPage.goTo();
    await loginPage.validateLogin(USERS.lockedOut.username, USERS.lockedOut.password);

    await loginPage.verifyErrorMessage(
        "Epic sadface: Sorry, this user has been locked out."
    );
});

// ─────────────────────────────────────────────────────────────────────────────
// SEC-01a: Unauthenticated access to /inventory.html redirects to login page
// ─────────────────────────────────────────────────────────────────────────────
test("unauthenticated user is redirected from /inventory.html to login", async ({ page }) => {
    await page.goto("/inventory.html");

    await expect(page).not.toHaveURL(/inventory.html/);
    await expect(page.getByPlaceholder("Username")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// SEC-01b: Unauthenticated access to /cart.html redirects to login page
// ─────────────────────────────────────────────────────────────────────────────
test("unauthenticated user is redirected from /cart.html to login", async ({ page }) => {
    await page.goto("/cart.html");

    await expect(page).not.toHaveURL(/cart.html/);
    await expect(page.getByPlaceholder("Username")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// SEC-01c: Unauthenticated access to /checkout-step-one.html redirects to login
// ─────────────────────────────────────────────────────────────────────────────
test("unauthenticated user is redirected from /checkout-step-one.html to login", async ({ page }) => {
    await page.goto("/checkout-step-one.html");

    await expect(page).not.toHaveURL(/checkout-step-one.html/);
    await expect(page.getByPlaceholder("Username")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// SEC-01d: Unauthenticated access to /checkout-step-two.html redirects to login
// ─────────────────────────────────────────────────────────────────────────────
test("unauthenticated user is redirected from /checkout-step-two.html to login", async ({ page }) => {
    await page.goto("/checkout-step-two.html");

    await expect(page).not.toHaveURL(/checkout-step-two.html/);
    await expect(page.getByPlaceholder("Username")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// SEC-01e: Unauthenticated access to /checkout-complete.html redirects to login
// ─────────────────────────────────────────────────────────────────────────────
test("unauthenticated user is redirected from /checkout-complete.html to login", async ({ page }) => {
    await page.goto("/checkout-complete.html");

    await expect(page).not.toHaveURL(/checkout-complete.html/);
    await expect(page.getByPlaceholder("Username")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// SEC-02: Browser back-button after logout must NOT restore authenticated view
// SauceDemo redirects any protected page access to "/" when no session exists.
// ─────────────────────────────────────────────────────────────────────────────
test("browser back button after logout does not restore authenticated session", async ({ page, loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();
    const menu = loggedInPoManager.getmeMenu();

    await inventory.verifyPageLoaded();

    await menu.open();
    await menu.clickLogout();

    await expect(page).toHaveURL(BASE_URL);

    // Go back as if the user clicked the browser Back button
    await page.goBack();

    // SauceDemo should redirect away from the authenticated page
    await expect(page).not.toHaveURL(/inventory.html/);
    await expect(page.getByPlaceholder("Username")).toBeVisible();
});
