const { test, expect } = require("../../fixtures/login.fixture");

// ─────────────────────────────────────────────────────────────────────────────
// FOOT-01: Social media links in the footer have correct href attributes
// ─────────────────────────────────────────────────────────────────────────────
test("footer Twitter link points to the Sauce Labs Twitter account", async ({
    page,
    loggedInPoManager,
}) => {
    const inventory = loggedInPoManager.getmeInventory();
    await inventory.verifyPageLoaded();

    const twitterLink = page.locator("a[href*='twitter.com']").first();
    await expect(twitterLink).toBeVisible();

    const href = await twitterLink.getAttribute("href");
    expect(href).toContain("twitter.com");
});

test("footer LinkedIn link points to the Sauce Labs LinkedIn page", async ({
    page,
    loggedInPoManager,
}) => {
    const inventory = loggedInPoManager.getmeInventory();
    await inventory.verifyPageLoaded();

    const linkedInLink = page.locator("a[href*='linkedin.com']").first();
    await expect(linkedInLink).toBeVisible();

    const href = await linkedInLink.getAttribute("href");
    expect(href).toContain("linkedin.com");
});

test("footer Facebook link points to the Sauce Labs Facebook page", async ({
    page,
    loggedInPoManager,
}) => {
    const inventory = loggedInPoManager.getmeInventory();
    await inventory.verifyPageLoaded();

    const facebookLink = page.locator("a[href*='facebook.com']").first();
    await expect(facebookLink).toBeVisible();

    const href = await facebookLink.getAttribute("href");
    expect(href).toContain("facebook.com");
});

// ─────────────────────────────────────────────────────────────────────────────
// FOOT-01d: All three social links open in a new tab (target="_blank")
// ─────────────────────────────────────────────────────────────────────────────
test("all social media footer links have target=_blank", async ({
    page,
    loggedInPoManager,
}) => {
    const inventory = loggedInPoManager.getmeInventory();
    await inventory.verifyPageLoaded();

    const socialLinks = page.locator(".social");
    const links = socialLinks.locator("a");
    const count = await links.count();

    expect(count).toBeGreaterThanOrEqual(3);

    for (let i = 0; i < count; i++) {
        const target = await links.nth(i).getAttribute("target");
        expect(target, `Social link ${i} should open in a new tab`).toBe("_blank");
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// FOOT-02: Footer displays copyright text
// ─────────────────────────────────────────────────────────────────────────────
test("footer displays the Sauce Labs copyright notice", async ({
    page,
    loggedInPoManager,
}) => {
    const inventory = loggedInPoManager.getmeInventory();
    await inventory.verifyPageLoaded();

    const footer = page.locator(".footer_copy");
    await expect(footer).toBeVisible();

    const footerText = await footer.textContent();
    expect(footerText).toContain("Sauce Labs");
    // Verify it contains a copyright symbol or "All Rights Reserved"
    const hasCredit = footerText.includes("©") || footerText.includes("All Rights Reserved");
    expect(hasCredit).toBe(true);
});

// ─────────────────────────────────────────────────────────────────────────────
// FOOT-03: Footer is visible on the cart page as well
// ─────────────────────────────────────────────────────────────────────────────
test("footer is visible on the cart page", async ({
    page,
    loggedInPoManager,
}) => {
    const cart = loggedInPoManager.getmeCart();

    await cart.navigateToCart();
    await cart.verifyOnCartPage();

    const footer = page.locator(".footer_copy");
    await expect(footer).toBeVisible();
});

// ─────────────────────────────────────────────────────────────────────────────
// FOOT-04: Footer robot image is displayed on the inventory page
// ─────────────────────────────────────────────────────────────────────────────
test("footer bot image is visible on the inventory page", async ({
    page,
    loggedInPoManager,
}) => {
    const inventory = loggedInPoManager.getmeInventory();
    await inventory.verifyPageLoaded();

    const robotImg = page.locator(".footer_robot");
    await expect(robotImg).toBeVisible();
});
