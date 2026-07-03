const { test, expect } = require("@playwright/test");
const { POmanager } = require("../Pages/POmanager");
const dataSet = JSON.parse(JSON.stringify(require("../Utiles/placeOrderTestData.json")));

for (const data of dataSet)

test(`Project1 Saucedemo for ${data.productName}`, async ({ page }) => {

    const poManager = new POmanager(page);

    const loginPage = poManager.getmeLoginPage();
    const addToCart = poManager.getmeAddToCart();
    const checkout = poManager.getmeCheckout();
 
    await loginPage.goTo();
    await loginPage.validateLogin(data.username, data.password);

    await addToCart.searchProduct(data.productName);
    await addToCart.navigateToCart();

    await expect(
    page.locator(".inventory_item_name")).toContainText(data.productName);
         
    await checkout.checkout();

    await expect(
        page.getByText("Thank you for your order!")
    ).toBeVisible();
});

