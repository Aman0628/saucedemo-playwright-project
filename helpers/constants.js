const BASE_URL = "https://www.saucedemo.com/";

const USERS = {
    standard: { username: "standard_user", password: "secret_sauce" },
    problem: { username: "problem_user", password: "secret_sauce" },
    performanceGlitch: { username: "performance_glitch_user", password: "secret_sauce" },
    lockedOut: { username: "locked_out_user", password: "secret_sauce" },
    error: { username: "error_user", password: "secret_sauce" },
    visual: { username: "visual_user", password: "secret_sauce" },
};

const ERROR_MESSAGES = {
    loginMismatch: "Epic sadface: Username and password do not match any user in this service",
    usernameRequired: "Epic sadface: Username is required",
    passwordRequired: "Epic sadface: Password is required",
    checkoutFirstNameRequired: "Error: First Name is required",
    checkoutLastNameRequired: "Error: Last Name is required",
    checkoutZipRequired: "Error: Postal Code is required",
};

const PRODUCTS = {
    backpack: "Sauce Labs Backpack",
    bikeLight: "Sauce Labs Bike Light",
    boltTShirt: "Sauce Labs Bolt T-Shirt",
    fleeceJacket: "Sauce Labs Fleece Jacket",
    onesie: "Sauce Labs Onesie",
    redTShirt: "Test.allTheThings() T-Shirt (Red)",
};

module.exports = { BASE_URL, USERS, ERROR_MESSAGES, PRODUCTS };
