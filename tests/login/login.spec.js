const { test } = require("../../fixtures/login.fixture");
const dataSet = JSON.parse(JSON.stringify(require("../../Utils/testData.json")));

for (const data of dataSet)

test(`Saucedemo test for ${data.testCase}`, async ({ poManager }) => {

    const loginPage = poManager.getmeLoginPage();

    await loginPage.goTo();
    await loginPage.validateLogin(data.username, data.password);

     if (data.shouldLogin) {

            await loginPage.verifySuccessfulLogin();

        } else {

            await loginPage.verifyErrorMessage(data.errorMessage);

        }

    });
