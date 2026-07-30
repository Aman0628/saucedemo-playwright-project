const { test } = require("../../fixtures/login.fixture");
const { PRODUCTS } = require("../../helpers/constants");
const dataSet = JSON.parse(JSON.stringify(require("../../Utils/checkoutData.json")));

for (const data of dataSet)

test(`Saucedemo checkout validation for ${data.testCase}`, async ({ loggedInPoManager }) => {

    const inventory = loggedInPoManager.getmeInventory();
    const cart = loggedInPoManager.getmeCart();
    const checkoutInfo = loggedInPoManager.getmeCheckoutInfo();
    const checkoutOverview = loggedInPoManager.getmeCheckoutOverview();

    await inventory.addProductToCartByName(PRODUCTS.backpack);
    await cart.navigateToCart();
    await cart.clickCheckout();

    await checkoutInfo.verifyOnCheckoutStepOne();
    await checkoutInfo.fillInfo(data.firstName, data.lastName, data.zip);
    await checkoutInfo.clickContinue();

    if (data.shouldProceed) {

        await checkoutOverview.verifyOnCheckoutOverviewPage();

    } else {

        await checkoutInfo.verifyOnCheckoutStepOne();
        await checkoutInfo.verifyErrorMessage(data.errorMessage);

    }

});

// CHKV-06: Error banner clears once the form is resubmitted with valid data
test("checkout error clears after fixing fields and resubmitting", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();
    const cart = loggedInPoManager.getmeCart();
    const checkoutInfo = loggedInPoManager.getmeCheckoutInfo();
    const checkoutOverview = loggedInPoManager.getmeCheckoutOverview();

    await inventory.addProductToCartByName(PRODUCTS.backpack);
    await cart.navigateToCart();
    await cart.clickCheckout();

    await checkoutInfo.verifyOnCheckoutStepOne();

    // Submit blank first - should show an error
    await checkoutInfo.fillInfo("", "", "");
    await checkoutInfo.clickContinue();
    await checkoutInfo.verifyErrorMessage("Error: First Name is required");

    // Fix the fields and resubmit
    await checkoutInfo.fillInfo("Aman", "Kumar", "453441");
    await checkoutInfo.clickContinue();

    await checkoutOverview.verifyOnCheckoutOverviewPage();
});
