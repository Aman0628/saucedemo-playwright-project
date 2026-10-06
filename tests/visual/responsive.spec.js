const { test, expect } = require("../../fixtures/login.fixture");
const { PRODUCTS } = require("../../helpers/constants");

// ─────────────────────────────────────────────────────────────────────────────
// RESP-01: Mobile viewport — burger menu button and cart icon are accessible
// Using iPhone SE dimensions (375 x 667)
// ─────────────────────────────────────────────────────────────────────────────
test("inventory page is usable on a mobile viewport (375x667)", async ({
    page,
    loggedInPoManager,
}) => {
    const inventory = loggedInPoManager.getmeInventory();
    await inventory.verifyPageLoaded();

    // Shrink to mobile dimensions
    await page.setViewportSize({ width: 375, height: 667 });

    // Core UI elements must still be visible
    await expect(page.locator(".app_logo")).toBeVisible();
    await expect(page.locator("#react-burger-menu-btn")).toBeVisible();
    await expect(page.locator(".shopping_cart_link")).toBeVisible();
    await expect(page.locator(".title")).toHaveText("Products");
    await inventory.verifyAllProductsDisplayed();
});

// ─────────────────────────────────────────────────────────────────────────────
// RESP-02: Mobile viewport — burger menu can be opened and closed
// ─────────────────────────────────────────────────────────────────────────────
test("burger menu opens and closes on mobile viewport", async ({
    page,
    loggedInPoManager,
}) => {
    const inventory = loggedInPoManager.getmeInventory();
    const menu = loggedInPoManager.getmeMenu();

    await inventory.verifyPageLoaded();
    await page.setViewportSize({ width: 375, height: 667 });

    await menu.open();
    await menu.close();
});

// ─────────────────────────────────────────────────────────────────────────────
// RESP-03: Mobile viewport — adding a product to cart shows the badge
// ─────────────────────────────────────────────────────────────────────────────
test("cart badge updates correctly on mobile viewport after adding a product", async ({
    page,
    loggedInPoManager,
}) => {
    const inventory = loggedInPoManager.getmeInventory();

    await inventory.verifyPageLoaded();
    await page.setViewportSize({ width: 375, height: 667 });

    await inventory.addProductToCartByName(PRODUCTS.backpack);
    await inventory.verifyCartBadgeCount(1);
});

// ─────────────────────────────────────────────────────────────────────────────
// RESP-04: Tablet viewport (768x1024) — inventory page loads with all products
// ─────────────────────────────────────────────────────────────────────────────
test("inventory page loads correctly on a tablet viewport (768x1024)", async ({
    page,
    loggedInPoManager,
}) => {
    const inventory = loggedInPoManager.getmeInventory();
    await inventory.verifyPageLoaded();

    await page.setViewportSize({ width: 768, height: 1024 });

    await expect(page.locator(".app_logo")).toBeVisible();
    await inventory.verifyAllProductsDisplayed();
});

// ─────────────────────────────────────────────────────────────────────────────
// RESP-05: Wide desktop viewport (1920x1080) — inventory page loads correctly
// ─────────────────────────────────────────────────────────────────────────────
test("inventory page loads correctly on a wide desktop viewport (1920x1080)", async ({
    page,
    loggedInPoManager,
}) => {
    const inventory = loggedInPoManager.getmeInventory();
    await inventory.verifyPageLoaded();

    await page.setViewportSize({ width: 1920, height: 1080 });

    await expect(page.locator(".app_logo")).toBeVisible();
    await inventory.verifyAllProductsDisplayed();
});

// ─────────────────────────────────────────────────────────────────────────────
// RESP-06: Cart page is fully functional on mobile viewport
// ─────────────────────────────────────────────────────────────────────────────
test("cart page is functional on a mobile viewport", async ({
    page,
    loggedInPoManager,
}) => {
    const inventory = loggedInPoManager.getmeInventory();
    const cart = loggedInPoManager.getmeCart();

    await page.setViewportSize({ width: 375, height: 667 });

    await inventory.addProductToCartByName(PRODUCTS.bikeLight);
    await cart.navigateToCart();
    await cart.verifyOnCartPage();
    await cart.verifyProductInCart(PRODUCTS.bikeLight);

    // Checkout button must be reachable and clickable on mobile
    await expect(page.getByRole("button", { name: "Checkout" })).toBeVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// RESP-07: Login page renders correctly on mobile viewport
// ─────────────────────────────────────────────────────────────────────────────
test("login page is usable on mobile viewport", async ({ page, poManager }) => {
    const loginPage = poManager.getmeLoginPage();
    await loginPage.goTo();

    await page.setViewportSize({ width: 375, height: 667 });

    await expect(page.getByPlaceholder("Username")).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});
