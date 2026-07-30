const { test, expect } = require("../../fixtures/login.fixture");

function isSortedAscending(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] > arr[i]) return false;
    }
    return true;
}

function isSortedDescending(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] < arr[i]) return false;
    }
    return true;
}

// SORT-01: Sort by Name A-Z (default)
test("products are sorted A to Z by default", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();

    const selected = await inventory.getSelectedSortOption();
    expect(selected).toBe("az");

    const names = await inventory.getDisplayedProductNames();
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sortedNames);
});

// SORT-02: Sort by Name Z-A
test("sort products by name Z to A", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();

    await inventory.sortBy("za");

    const names = await inventory.getDisplayedProductNames();
    const sortedDescending = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sortedDescending);
});

// SORT-03: Sort by Price low to high
test("sort products by price low to high", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();

    await inventory.sortBy("lohi");

    const prices = await inventory.getDisplayedProductPrices();
    expect(isSortedAscending(prices)).toBe(true);
});

// SORT-04: Sort by Price high to low
test("sort products by price high to low", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();

    await inventory.sortBy("hilo");

    const prices = await inventory.getDisplayedProductPrices();
    expect(isSortedDescending(prices)).toBe(true);
});

// SORT-05: Sort selection resets after visiting a product detail page
// NOTE: confirmed via a real run against the live site - navigating to a
// product detail page and clicking "Back to products" resets the sort
// dropdown to the default "Name (A to Z)" rather than preserving the
// previously selected option. This test documents that actual behavior.
test("sort resets to default after visiting a product detail page and going back", async ({ page, loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();

    await inventory.sortBy("za");
    const namesInZA = await inventory.getDisplayedProductNames();
    const expectedDefaultOrder = [...namesInZA].sort((a, b) => a.localeCompare(b));

    await inventory.openProductDetail(namesInZA[0]);
    await expect(page).toHaveURL(/inventory-item.html/);

    await inventory.goBackToProducts();

    const selected = await inventory.getSelectedSortOption();
    expect(selected).toBe("az");

    const namesAfter = await inventory.getDisplayedProductNames();
    expect(namesAfter).toEqual(expectedDefaultOrder);
});

// SORT-06: Sort order does not change product count
test("product count stays the same across all sort options", async ({ loggedInPoManager }) => {
    const inventory = loggedInPoManager.getmeInventory();

    const sortOptions = ["az", "za", "lohi", "hilo"];

    for (const option of sortOptions) {
        await inventory.sortBy(option);
        await inventory.verifyAllProductsDisplayed();
    }
});
