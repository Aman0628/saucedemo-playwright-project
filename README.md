# SauceDemo Playwright Automation Framework

## Project Overview
This project is an end-to-end automation framework built using Playwright and JavaScript for the SauceDemo e-commerce application.

## Features
- Page Object Model (POM)
- Data-Driven Testing using JSON
- End-to-End Order Flow
- Assertions and Validations
- Parameterized Test Execution
- Git and GitHub Integration

## Project Structure

```text
Pages/
Utiles/
tests/
playwright.config.ts
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
npx playwright test
```

## Run Specific Test

```bash
npx playwright test tests/Project1.spec.js
```

## Generate HTML Report

```bash
npx playwright show-report
```

## Automated Scenarios
- Login with valid credentials
- Search Product
- Add Product to Cart
- Verify Product in Cart
- Checkout and Place Order
- Verify Order Success Message
