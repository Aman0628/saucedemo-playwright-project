const { test, expect } = require("../../fixtures/login.fixture");
const { PRODUCTS } = require("../../helpers/constants");

// ─────────────────────────────────────────────────────────────────────────────
// PDP-01: Product detail page shows correct name, description, price and image
// ─────────────────────────────────────────────────────────────────────────────
test("product detail page shows correct name, price and image for Sauce Labs Backpack", async ({
    page,
    loggedInPoManager,
}) => {
    const inventory = loggedInPoManager.getmeInventory();
    const productName = PRODUCTS.backpack;

    // Grab values from the inventory grid BEFORE clicking through
    const inventoryItem = page.locator(".inventory_item").filter({ hasText: productName });
    const inventoryPrice = await inventoryItem
        .locator(".inventory_item_price")
        .textContent();
    const inventoryDesc = await inventoryItem
        .locator(".inventory_item_desc")
        .textContent();

    await inventory.openProductDetail(productName);
    await inventory.verifyOnProductDetailPage(productName);

    // Assertions on detail page
    await expect(page.locator(".inventory_details_price")).toHaveText(inventoryPrice.trim());
    await expect(page.locator(".inventory_details_desc")).toHaveText(inventoryDesc.trim());

    // Image should be present and have a valid src
    const imgSrc = await page.locator(".inventory_details_img").getAttribute("src");
    expect(imgSrc).toBeTruthy();
    expect(imgSrc).not.toContain("sl-404"); // should NOT be the 404 placeholder image
});

// ─────────────────────────────────────────────────────────────────────────────
// PDP-02: Add to cart button on PDP changes to Remove after click; reverse also works
// ─────────────────────────────────────────────────────────────────────────────
test("add and remove product via the product detail page button", async ({
    loggedInPoManager,
}) => {
    const inventory = loggedInPoManager.getmeInventory();
    const productName = PRODUCTS.bikeLight;

    await inventory.openProductDetail(productName);
    await inventory.verifyOnProductDetailPage(productName);

    // Add from detail page
    await inventory.addToCartFromDetailPage();
    await inventory.verifyCartBadgeCount(1);

    // Button should now say "Remove"
    const removeBtn = (await inventory.page.getByRole("button", { name: "Remove" }));
    await expect(removeBtn).toBeVisible();

    // Click Remove — cart badge should clear
    await removeBtn.click();
    await inventory.verifyCartBadgeCount(0);

    // Button reverts to "Add to cart"
    await expect(
        inventory.page.getByRole("button", { name: "Add to cart" })
    ).toBeVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// PDP-03a: Navigate back from PDP using "Back to products" button
// ─────────────────────────────────────────────────────────────────────────────
test("Back to products button returns user to inventory page", async ({
    page,
    loggedInPoManager,
}) => {
    const inventory = loggedInPoManager.getmeInventory();

    await inventory.openProductDetail(PRODUCTS.fleeceJacket);
    await expect(page).toHaveURL(/inventory-item.html/);

    await inventory.goBackToProducts();

    await inventory.verifyPageLoaded();
    await inventory.verifyAllProductsDisplayed();
});

// ─────────────────────────────────────────────────────────────────────────────
// PDP-03b: Direct navigation to a valid product URL works correctly
// Item IDs on SauceDemo: 0-5 (6 products)
// ─────────────────────────────────────────────────────────────────────────────
test("direct URL navigation to a valid product item page loads correctly", async ({
    page,
    poManager,
}) => {
    const loginPage = poManager.getmeLoginPage();
    const { USERS } = require("../../helpers/constants");

    await loginPage.goTo();
    await loginPage.validateLogin(USERS.standard.username, USERS.standard.password);

    await page.goto("/inventory-item.html?id=4");
    await expect(page).toHaveURL(/inventory-item.html\?id=4/);
    await expect(page.locator(".inventory_details_name")).toBeVisible();
    await expect(page.locator(".inventory_details_price")).toBeVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// PDP-04: All 6 inventory card images load without being the 404 placeholder
// (This would fail for problem_user — standard_user should pass)
// ─────────────────────────────────────────────────────────────────────────────
test("all product images on inventory page are not broken (standard_user)", async ({
    page,
    loggedInPoManager,
}) => {
    const inventory = loggedInPoManager.getmeInventory();
    await inventory.verifyPageLoaded();

    const images = page.locator(".inventory_item_img img");
    const count = await images.count();
    expect(count).toBe(6);

    for (let i = 0; i < count; i++) {
        const src = await images.nth(i).getAttribute("src");
        expect(src, `Product image ${i} should not be the 404 placeholder`).not.toContain(
            "sl-404"
        );
        expect(src, `Product image ${i} should have a valid src`).toBeTruthy();
    }
});
