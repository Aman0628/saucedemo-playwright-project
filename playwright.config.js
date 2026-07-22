import { defineConfig, devices } from '@playwright/test';
 
/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  fullyParallel: true,
  retries: 1,

  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: 'ture',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
};

module.exports = config