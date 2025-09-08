import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL || 'https://example.com',
    trace: 'on-first-retry'
  },
  reporter: [['list']]
});
