# SauceDemo Playwright Automation Framework

## Project Overview
This project is an end-to-end automation framework built using Playwright and JavaScript for the SauceDemo e-commerce application.

## Features
- Page Object Model (POM)
- Custom login fixture (`fixtures/login.fixture.js`) — no repeated login boilerplate in specs
- Data-Driven Testing using JSON (`Utils/testData.json`, `Utils/checkoutData.json`)
- End-to-End Order Flow
- Assertions and Validations
- Parameterized Test Execution
- Git and GitHub Integration

## Project Structure

```text
Pages/        Page Object classes (one per SauceDemo page/component)
Utils/        JSON test data for data-driven specs
fixtures/     Custom Playwright test fixtures (e.g. authenticated sessions)
helpers/      Shared constants, logging, and random data generators
tests/
  cart/          add/remove cart items
  checkout/      checkout happy path + field validation
  inventory/     inventory display + sorting
  login/         login scenarios
  navigation/    logout + burger menu
playwright.config.js
package.json
```

## Tech Stack
- Playwright
- JavaScript
- Node.js

## Installation

```bash
npm install
npx playwright install
```

## Run Tests

```bash
npm test
# or
npx playwright test
```

## Run Specific Test File

```bash
npx playwright test tests/checkout/checkout.spec.js
```

## Run Headed (see the browser)

```bash
npm run test:headed
```

## Generate / View HTML Report

```bash
npm run test:report
```

## Automated Scenarios
- Login with valid and invalid credentials (`tests/login`)
- Add / remove products from the cart (`tests/cart`)
- Sort inventory by name and price (`tests/inventory/sorting.spec.js`)
- Full checkout flow, cancellation, and field validation (`tests/checkout`)
- Logout and burger menu behavior (`tests/navigation`)
