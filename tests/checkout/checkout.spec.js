const { test, expect } = require("../../fixtures/login.fixture");
const { USERS, PRODUCTS } = require("../../helpers/constants");

// CHK-01: Complete full checkout - single item
test("complete checkout with a single item", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();
    const cart = loggedInPoManager.getmeCart();
    const checkoutInfo = loggedInPoManager.getmeCheckoutInfo();
    const checkoutOverview = loggedInPoManager.getmeCheckoutOverview();
    const orderComplete = loggedInPoManager.getmeOrderComplete();

    await inventory.addProductToCartByName(PRODUCTS.backpack);
    await cart.navigateToCart();
    await cart.clickCheckout();

    await checkoutInfo.verifyOnCheckoutStepOne();
    await checkoutInfo.fillValidInfoAndContinue();

    await checkoutOverview.verifyOnCheckoutOverviewPage();
    await checkoutOverview.clickFinish();

    await orderComplete.verifyOnOrderCompletePage();
    await orderComplete.verifyOrderCompleteMessage();
});

// CHK-02: Complete full checkout - multiple items
test("complete checkout with multiple items", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();
    const cart = loggedInPoManager.getmeCart();
    const checkoutInfo = loggedInPoManager.getmeCheckoutInfo();
    const checkoutOverview = loggedInPoManager.getmeCheckoutOverview();
    const orderComplete = loggedInPoManager.getmeOrderComplete();

    const productsToAdd = [PRODUCTS.backpack, PRODUCTS.bikeLight, PRODUCTS.boltTShirt];

    for (const productName of productsToAdd) {
        await inventory.addProductToCartByName(productName);
    }

    await cart.navigateToCart();
    await cart.clickCheckout();

    await checkoutInfo.verifyOnCheckoutStepOne();
    await checkoutInfo.fillValidInfoAndContinue();

    await checkoutOverview.verifyOnCheckoutOverviewPage();
    await checkoutOverview.verifyItemCount(productsToAdd.length);
    await checkoutOverview.clickFinish();

    await orderComplete.verifyOnOrderCompletePage();
    await orderComplete.verifyOrderCompleteMessage();

    await inventory.verifyCartBadgeCount(0);
});

// CHK-03: Checkout overview shows correct item total
test("checkout overview shows correct item total", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();
    const cart = loggedInPoManager.getmeCart();
    const checkoutInfo = loggedInPoManager.getmeCheckoutInfo();
    const checkoutOverview = loggedInPoManager.getmeCheckoutOverview();

    const productsToAdd = [PRODUCTS.backpack, PRODUCTS.onesie];

    for (const productName of productsToAdd) {
        await inventory.addProductToCartByName(productName);
    }

    await cart.navigateToCart();
    await cart.clickCheckout();
    await checkoutInfo.fillValidInfoAndContinue();

    await checkoutOverview.verifyOnCheckoutOverviewPage();

    const itemPrices = await checkoutOverview.getItemPrices();
    const expectedItemTotal = itemPrices.reduce((sum, price) => sum + price, 0);
    const actualItemTotal = await checkoutOverview.getItemTotal();

    expect(actualItemTotal).toBeCloseTo(expectedItemTotal, 2);
});

// CHK-04: Checkout overview shows tax and total
test("checkout overview shows correct tax and total", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();
    const cart = loggedInPoManager.getmeCart();
    const checkoutInfo = loggedInPoManager.getmeCheckoutInfo();
    const checkoutOverview = loggedInPoManager.getmeCheckoutOverview();

    await inventory.addProductToCartByName(PRODUCTS.fleeceJacket);

    await cart.navigateToCart();
    await cart.clickCheckout();
    await checkoutInfo.fillValidInfoAndContinue();

    await checkoutOverview.verifyOnCheckoutOverviewPage();

    const itemTotal = await checkoutOverview.getItemTotal();
    const tax = await checkoutOverview.getTax();
    const total = await checkoutOverview.getTotal();

    // SauceDemo applies an 8% tax rate
    expect(tax).toBeCloseTo(itemTotal * 0.08, 1);
    expect(total).toBeCloseTo(itemTotal + tax, 2);
});

// CHK-05: Cancel from checkout step one returns to cart
test("cancel on checkout info page returns to cart with items intact", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();
    const cart = loggedInPoManager.getmeCart();
    const checkoutInfo = loggedInPoManager.getmeCheckoutInfo();

    const productName = PRODUCTS.backpack;

    await inventory.addProductToCartByName(productName);
    await cart.navigateToCart();
    await cart.clickCheckout();

    await checkoutInfo.verifyOnCheckoutStepOne();
    await checkoutInfo.clickCancel();

    await cart.verifyOnCartPage();
    await cart.verifyProductInCart(productName);
});

// CHK-06: Cancel from checkout overview returns to inventory
test("cancel on checkout overview page returns to inventory", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();
    const cart = loggedInPoManager.getmeCart();
    const checkoutInfo = loggedInPoManager.getmeCheckoutInfo();
    const checkoutOverview = loggedInPoManager.getmeCheckoutOverview();

    await inventory.addProductToCartByName(PRODUCTS.backpack);
    await cart.navigateToCart();
    await cart.clickCheckout();
    await checkoutInfo.fillValidInfoAndContinue();

    await checkoutOverview.verifyOnCheckoutOverviewPage();
    await checkoutOverview.clickCancel();

    await inventory.verifyPageLoaded();
});

// CHK-07: "Back Home" from order complete returns to inventory
test("back home from order complete page returns to an empty inventory cart", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();
    const cart = loggedInPoManager.getmeCart();
    const checkoutInfo = loggedInPoManager.getmeCheckoutInfo();
    const checkoutOverview = loggedInPoManager.getmeCheckoutOverview();
    const orderComplete = loggedInPoManager.getmeOrderComplete();

    await inventory.addProductToCartByName(PRODUCTS.backpack);
    await cart.navigateToCart();
    await cart.clickCheckout();
    await checkoutInfo.fillValidInfoAndContinue();
    await checkoutOverview.clickFinish();

    await orderComplete.verifyOnOrderCompletePage();
    await orderComplete.clickBackHome();

    await inventory.verifyPageLoaded();
    await inventory.verifyCartBadgeCount(0);
});

// CHK-08: Checkout with performance_glitch_user
test("checkout completes successfully for performance_glitch_user", async ({ poManager }) => {
    test.setTimeout(60000);

    const loginPage = poManager.getmeLoginPage();
    const inventory = poManager.getmeInventory();
    const cart = poManager.getmeCart();
    const checkoutInfo = poManager.getmeCheckoutInfo();
    const checkoutOverview = poManager.getmeCheckoutOverview();
    const orderComplete = poManager.getmeOrderComplete();

    await loginPage.goTo();
    await loginPage.validateLogin(USERS.performanceGlitch.username, USERS.performanceGlitch.password);

    await inventory.addProductToCartByName(PRODUCTS.backpack);
    await cart.navigateToCart();
    await cart.clickCheckout();
    await checkoutInfo.fillValidInfoAndContinue();
    await checkoutOverview.verifyOnCheckoutOverviewPage();
    await checkoutOverview.clickFinish();

    await orderComplete.verifyOnOrderCompletePage();
    await orderComplete.verifyOrderCompleteMessage();
});
