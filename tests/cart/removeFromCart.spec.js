const { test } = require("../../fixtures/login.fixture");
const { PRODUCTS } = require("../../helpers/constants");

// CART-09: Remove product from inventory page
test("remove a product directly from the inventory page", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();

    const productName = PRODUCTS.backpack;

    await inventory.addProductToCartByName(productName);
    await inventory.verifyCartBadgeCount(1);
    await inventory.verifyProductButtonShowsRemove(productName);

    await inventory.removeProductByName(productName);
    await inventory.verifyProductButtonShowsAddToCart(productName);
    await inventory.verifyCartBadgeCount(0);
});

// CART-10: Remove product from cart page
test("remove a product from the cart page", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();
    const cart = loggedInPoManager.getmeCart();

    const productName = PRODUCTS.bikeLight;

    await inventory.addProductToCartByName(productName);
    await cart.navigateToCart();
    await cart.verifyOnCartPage();
    await cart.verifyProductInCart(productName);

    await cart.removeProductFromCart(productName);
    await cart.verifyProductNotInCart(productName);
    await cart.verifyCartEmpty();
});

// CART-11: Remove one of several products
test("remove one product while others remain in the cart", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();
    const cart = loggedInPoManager.getmeCart();

    const productsToAdd = [PRODUCTS.backpack, PRODUCTS.bikeLight, PRODUCTS.boltTShirt];

    for (const productName of productsToAdd) {
        await inventory.addProductToCartByName(productName);
    }

    await cart.navigateToCart();
    await cart.verifyCartItemCount(3);

    await cart.removeProductFromCart(PRODUCTS.bikeLight);

    await cart.verifyCartItemCount(2);
    await cart.verifyProductInCart(PRODUCTS.backpack);
    await cart.verifyProductInCart(PRODUCTS.boltTShirt);
    await cart.verifyProductNotInCart(PRODUCTS.bikeLight);
});

// CART-12: Remove all products empties cart
test("removing all products empties the cart", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();
    const cart = loggedInPoManager.getmeCart();

    const productsToAdd = [PRODUCTS.backpack, PRODUCTS.fleeceJacket];

    for (const productName of productsToAdd) {
        await inventory.addProductToCartByName(productName);
    }

    await cart.navigateToCart();
    await cart.verifyCartItemCount(2);

    for (const productName of productsToAdd) {
        await cart.removeProductFromCart(productName);
    }

    await cart.verifyCartEmpty();
    await cart.verifyCartBadgeHidden();
});

// CART-13: Cart badge hidden when cart is empty
test("cart badge is not shown when the cart has no items", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();

    await inventory.verifyPageLoaded();
    await inventory.verifyCartBadgeCount(0);
});
