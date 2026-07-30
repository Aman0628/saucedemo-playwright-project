const { test } = require("../../fixtures/login.fixture");
const { USERS, PRODUCTS } = require("../../helpers/constants");

// CART-01: Add single product to cart
test("add a single product to the cart", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();

    await inventory.addProductToCartByName(PRODUCTS.backpack);
    await inventory.verifyCartBadgeCount(1);
});

// CART-02: Add multiple products to cart
test("add multiple products to the cart", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();

    const productsToAdd = [PRODUCTS.backpack, PRODUCTS.bikeLight, PRODUCTS.boltTShirt];

    for (const productName of productsToAdd) {
        await inventory.addProductToCartByName(productName);
    }

    await inventory.verifyCartBadgeCount(productsToAdd.length);
});

// CART-03: Add all 6 products to cart
test("add all products to the cart", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();

    await inventory.addAllProductsToCart();
    await inventory.verifyCartBadgeCount(6);
});

// CART-04: Cart page shows correct product details
test("cart page shows correct product details after adding", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();
    const cart = loggedInPoManager.getmeCart();

    const productName = PRODUCTS.backpack;

    await inventory.addProductToCartByName(productName);
    await cart.navigateToCart();

    await cart.verifyOnCartPage();
    await cart.verifyCartItemCount(1);
    await cart.verifyProductInCart(productName);

    const details = await cart.getCartItemDetails(productName);
    if (details.quantity.trim() !== "1") {
        throw new Error(`Expected quantity 1, got ${details.quantity}`);
    }
});

// CART-05: Cart persists across navigation
test("cart badge persists when navigating away and back", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();

    const productName = PRODUCTS.bikeLight;

    await inventory.addProductToCartByName(productName);
    await inventory.verifyCartBadgeCount(1);

    await inventory.openProductDetail(productName);
    await inventory.verifyOnProductDetailPage(productName);
    await inventory.verifyCartBadgeCount(1);

    await inventory.goBackToProducts();
    await inventory.verifyCartBadgeCount(1);
});

// CART-06: Continue Shopping from cart
test("continue shopping returns to inventory page with cart intact", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();
    const cart = loggedInPoManager.getmeCart();

    const productName = PRODUCTS.fleeceJacket;

    await inventory.addProductToCartByName(productName);
    await cart.navigateToCart();
    await cart.verifyOnCartPage();

    await cart.continueShopping();
    await inventory.verifyPageLoaded();
    await inventory.verifyCartBadgeCount(1);
});

// CART-07: Add to cart from product detail page
test("add to cart from the product detail page", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();

    const productName = PRODUCTS.onesie;

    await inventory.openProductDetail(productName);
    await inventory.verifyOnProductDetailPage(productName);

    await inventory.addToCartFromDetailPage();
    await inventory.verifyCartBadgeCount(1);
});

// CART-08: problem_user has a documented SauceDemo bug where "Add to Cart"
// clicks don't register for some products. Confirmed via a real run against
// the live site: the click on the backpack does NOT update the cart badge.
// This test now documents that known-broken behavior instead of assuming
// success - if this ever starts passing with count 1, the bug was fixed
// upstream and this test should be updated to match.
test("add to cart is a known broken interaction for problem_user", async ({ poManager }) => {
    const loginPage = poManager.getmeLoginPage();
    const inventory = poManager.getmeInventory();

    await loginPage.goTo();
    await loginPage.validateLogin(USERS.problem.username, USERS.problem.password);

    await inventory.addProductToCartByName(PRODUCTS.backpack);
    await inventory.verifyCartBadgeCount(0);
});
