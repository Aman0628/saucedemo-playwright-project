const { expect } = require("@playwright/test");

class Menu {
    constructor(page) {
        this.page = page;

        this.menuButton = page.locator("#react-burger-menu-btn");
        this.closeButton = page.locator("#react-burger-cross-btn");
        this.menuWrapper = page.locator(".bm-menu-wrap");

        this.allItemsLink = page.locator("#inventory_sidebar_link");
        this.aboutLink = page.locator("#about_sidebar_link");
        this.logoutLink = page.locator("#logout_sidebar_link");
        this.resetAppStateLink = page.locator("#reset_sidebar_link");
    }

    async open() {
        await this.menuButton.click();
        await expect(this.menuWrapper).toBeVisible();
    }

    async close() {
        await this.closeButton.click();
        await expect(this.menuWrapper).not.toBeVisible();
    }

    async clickAllItems() {
        await this.allItemsLink.click();
    }

    async clickAbout() {
        await this.aboutLink.click();
    }

    async clickLogout() {
        await this.logoutLink.click();
    }

    async clickResetAppState() {
        await this.resetAppStateLink.click();
    }

    async verifyMenuNotVisible() {
        await expect(this.menuButton).not.toBeVisible();
    }
}

module.exports = { Menu };
