const { test, expect } = require("../../fixtures/login.fixture");
const { PRODUCTS } = require("../../helpers/constants");

// ─────────────────────────────────────────────────────────────────────────────
// CHK-09: Checkout button on an EMPTY cart — SauceDemo lets you proceed to step
// one even with no items in the cart. This test documents that behaviour.
// ─────────────────────────────────────────────────────────────────────────────
test("checkout button on an empty cart proceeds to checkout step one", async ({
    page,
    loggedInPoManager,
}) => {
    const cart = loggedInPoManager.getmeCart();

    // Navigate to cart WITHOUT adding any product
    await cart.navigateToCart();
    await cart.verifyOnCartPage();
    await cart.verifyCartEmpty();

    // Click checkout on an empty cart
    await cart.clickCheckout();

    // SauceDemo allows this — it takes the user to step one regardless
    await expect(page).toHaveURL(/checkout-step-one.html/);
});

// ─────────────────────────────────────────────────────────────────────────────
// CHK-10a: Form accepts special characters in name fields gracefully
// ─────────────────────────────────────────────────────────────────────────────
test("checkout accepts special characters in name fields and proceeds", async ({
    loggedInPoManager,
}) => {
    const inventory = loggedInPoManager.getmeInventory();
    const cart = loggedInPoManager.getmeCart();
    const checkoutInfo = loggedInPoManager.getmeCheckoutInfo();
    const checkoutOverview = loggedInPoManager.getmeCheckoutOverview();

    await inventory.addProductToCartByName(PRODUCTS.backpack);
    await cart.navigateToCart();
    await cart.clickCheckout();
    await checkoutInfo.verifyOnCheckoutStepOne();

    // Special characters in name fields
    await checkoutInfo.fillInfo("Ján-María", "O'Brien", "90210-1234");
    await checkoutInfo.clickContinue();

    // SauceDemo does not validate name field contents — expect to proceed
    await checkoutOverview.verifyOnCheckoutOverviewPage();
});

// ─────────────────────────────────────────────────────────────────────────────
// CHK-10b: Whitespace-only values are treated as empty and trigger validation
// ─────────────────────────────────────────────────────────────────────────────
test("whitespace-only first name is treated as empty and shows error", async ({
    loggedInPoManager,
}) => {
    const inventory = loggedInPoManager.getmeInventory();
    const cart = loggedInPoManager.getmeCart();
    const checkoutInfo = loggedInPoManager.getmeCheckoutInfo();

    await inventory.addProductToCartByName(PRODUCTS.backpack);
    await cart.navigateToCart();
    await cart.clickCheckout();
    await checkoutInfo.verifyOnCheckoutStepOne();

    // Whitespace-only values — SauceDemo treats them as empty
    await checkoutInfo.fillInfo("   ", "Kumar", "453441");
    await checkoutInfo.clickContinue();

    await checkoutInfo.verifyErrorMessage("Error: First Name is required");
});

// ─────────────────────────────────────────────────────────────────────────────
// CHK-10c: Numeric postal code with leading zeros is accepted
// ─────────────────────────────────────────────────────────────────────────────
test("numeric postal code with leading zeros is accepted during checkout", async ({
    loggedInPoManager,
}) => {
    const inventory = loggedInPoManager.getmeInventory();
    const cart = loggedInPoManager.getmeCart();
    const checkoutInfo = loggedInPoManager.getmeCheckoutInfo();
    const checkoutOverview = loggedInPoManager.getmeCheckoutOverview();

    await inventory.addProductToCartByName(PRODUCTS.bikeLight);
    await cart.navigateToCart();
    await cart.clickCheckout();
    await checkoutInfo.verifyOnCheckoutStepOne();

    await checkoutInfo.fillInfo("Test", "User", "00100");
    await checkoutInfo.clickContinue();

    await checkoutOverview.verifyOnCheckoutOverviewPage();
});

// ─────────────────────────────────────────────────────────────────────────────
// CHK-10d: Very long values in checkout fields are accepted by SauceDemo
// ─────────────────────────────────────────────────────────────────────────────
test("very long field values are accepted during checkout", async ({
    loggedInPoManager,
}) => {
    const inventory = loggedInPoManager.getmeInventory();
    const cart = loggedInPoManager.getmeCart();
    const checkoutInfo = loggedInPoManager.getmeCheckoutInfo();
    const checkoutOverview = loggedInPoManager.getmeCheckoutOverview();

    const longString = "A".repeat(200);

    await inventory.addProductToCartByName(PRODUCTS.onesie);
    await cart.navigateToCart();
    await cart.clickCheckout();
    await checkoutInfo.verifyOnCheckoutStepOne();

    await checkoutInfo.fillInfo(longString, longString, "453441");
    await checkoutInfo.clickContinue();

    // SauceDemo does not enforce a max-length server-side — expect to proceed
    await checkoutOverview.verifyOnCheckoutOverviewPage();
});

// ─────────────────────────────────────────────────────────────────────────────
// CHK-11: "Continue Shopping" from an EMPTY cart returns to inventory
// ─────────────────────────────────────────────────────────────────────────────
test("continue shopping from an empty cart returns to inventory", async ({
    loggedInPoManager,
}) => {
    const inventory = loggedInPoManager.getmeInventory();
    const cart = loggedInPoManager.getmeCart();

    // Navigate to cart while it is still empty
    await cart.navigateToCart();
    await cart.verifyOnCartPage();
    await cart.verifyCartEmpty();

    await cart.continueShopping();

    await inventory.verifyPageLoaded();
    await inventory.verifyAllProductsDisplayed();
    // Badge should still be hidden
    await inventory.verifyCartBadgeCount(0);
});

// ─────────────────────────────────────────────────────────────────────────────
// CHK-12: Completing checkout clears the cart badge and session state
// (end-to-end verification of post-order state)
// ─────────────────────────────────────────────────────────────────────────────
test("cart is empty and badge is hidden after a completed order", async ({
    loggedInPoManager,
}) => {
    const inventory = loggedInPoManager.getmeInventory();
    const cart = loggedInPoManager.getmeCart();
    const checkoutInfo = loggedInPoManager.getmeCheckoutInfo();
    const checkoutOverview = loggedInPoManager.getmeCheckoutOverview();
    const orderComplete = loggedInPoManager.getmeOrderComplete();

    await inventory.addProductToCartByName(PRODUCTS.backpack);
    await inventory.addProductToCartByName(PRODUCTS.bikeLight);
    await cart.navigateToCart();
    await cart.clickCheckout();
    await checkoutInfo.fillValidInfoAndContinue();
    await checkoutOverview.clickFinish();

    await orderComplete.verifyOnOrderCompletePage();
    await orderComplete.clickBackHome();

    // After a successful order, the cart badge should be gone
    await inventory.verifyPageLoaded();
    await inventory.verifyCartBadgeCount(0);
});
