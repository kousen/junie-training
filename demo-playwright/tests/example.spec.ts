import { test, expect } from '@playwright/test';

// A minimal, stable test so `npx playwright test` produces a real run during the demo.
// It targets the config's baseURL (https://example.com by default), which is a tiny,
// dependable page. Junie can use this as a starting point to add or improve tests.
test('example.com renders its heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Example Domain' })).toBeVisible();
});
