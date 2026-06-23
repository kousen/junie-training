import { expect, test } from '@playwright/test';

test('shows validation errors before registration can submit', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: /register/i }).click();

  const alert = page.getByRole('alert');
  await expect(alert).toContainText('Email is required.');
  await expect(alert).toContainText('Password is required.');
  await expect(alert).toContainText('Confirm your password.');
  await expect(alert).toContainText('You must accept the terms and conditions.');
  await expect(alert).toBeFocused();

  await expect(page.getByLabel(/email/i)).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByLabel(/^password$/i)).toHaveAttribute('aria-describedby', 'password-error');
  await expect(page.getByRole('checkbox', { name: /terms and conditions/i })).toHaveAttribute(
    'aria-describedby',
    'terms-error',
  );
});

test('submits valid registration details', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel(/email/i).fill('  alex@example.com  ');
  await page.getByLabel(/^password$/i).fill('Secure1!');
  await page.getByLabel(/confirm password/i).fill('Secure1!');
  await page.getByRole('checkbox', { name: /terms and conditions/i }).check();
  await page.getByRole('button', { name: /register/i }).click();

  await expect(page.getByRole('status')).toHaveText(/registration submitted/i);
  await expect(page.getByRole('alert')).toHaveCount(0);
});