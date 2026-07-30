const base = require("@playwright/test");
const { POmanager } = require("../Pages/POmanager");
const { USERS } = require("../helpers/constants");

/**
 * Extends the base Playwright test with two custom fixtures:
 *
 *  - poManager: a POmanager wired to the page, no login performed.
 *    Use this for tests that need to control login themselves
 *    (e.g. login.spec.js, or tests that log in as a non-standard user).
 *
 *  - loggedInPoManager: a POmanager wired to the page, already logged
 *    in as the standard_user. Use this for the common case where a
 *    test just needs to start from the inventory page.
 */
const test = base.test.extend({
    poManager: async ({ page }, use) => {
        await use(new POmanager(page));
    },

    loggedInPoManager: async ({ page }, use) => {
        const poManager = new POmanager(page);
        const loginPage = poManager.getmeLoginPage();

        await loginPage.goTo();
        await loginPage.validateLogin(USERS.standard.username, USERS.standard.password);
        await poManager.getmeInventory().verifyPageLoaded();

        await use(poManager);
    },
});

module.exports = { test, expect: base.expect };
