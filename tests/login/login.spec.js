const { test, expect } = require("@playwright/test");
const { POmanager } = require("../../Pages/POmanager");
const dataSet = JSON.parse(JSON.stringify(require("../../Utiles/testData.json")));

for (const data of dataSet)

test(`Saucedemo test for ${data.testCase}`, async ({ page }) => {

    const poManager = new POmanager(page);
    const loginPage = poManager.getmeLoginPage();
     
    await loginPage.goTo();
    await loginPage.validateLogin(data.username, data.password);
    
     if (data.shouldLogin) {

            await loginPage.verifySuccessfulLogin();

        } else {

            await loginPage.verifyErrorMessage(data.errorMessage);

        }

    });