# Playwright Demo: E2E Test Generation with MCP

## Duration: 20-30 minutes

## Demo Objectives
- Configure Playwright MCP tool
- Generate comprehensive E2E tests
- Demonstrate accessibility-first selectors
- Show Page Object Model generation
- Create different test categories (smoke, regression)

## Prerequisites
- WebStorm or VS Code with Junie
- Node.js 16+ installed
- Target web application (can use public site)
- Playwright MCP configured

## Part 1: Playwright MCP Setup (5 minutes)

### Configure Playwright MCP

1. Open Junie Settings → MCP
2. Add to `mcp.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp-server"]
    }
  }
}
```

3. Restart Junie
4. Verify Playwright shows as connected

### Initialize Playwright Project

```bash
npm init -y
npm install --save-dev @playwright/test
npx playwright install
```

## Part 2: Analyze Target Application (5 minutes)

### Demo Target Options

**Option 1: Public E-commerce Site**
- https://demo.opencart.com
- User registration, login, product search, cart

**Option 2: TodoMVC**
- https://todomvc.com/examples/react
- Simple CRUD operations

**Option 3: Banking Demo**
- https://demo.applitools.com
- Login, transactions, transfers

### Task 1: Analyze with Ask Mode

In Ask mode:
```
Analyze [chosen site URL] and identify:
1. Key user flows to test
2. Critical functionality
3. Potential test scenarios
4. Accessibility considerations
```

## Part 3: Generate Test Suite (10 minutes)

### Task 2: Generate Login Tests

In Code mode with Playwright MCP:
```
Using Playwright MCP, generate E2E tests for the login flow:
1. Successful login with valid credentials
2. Failed login with invalid credentials
3. Password reset flow
4. Remember me functionality
5. Session timeout handling

Use TypeScript, Page Object Model, and accessibility-first selectors
```

Expected output structure:
```typescript
// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}
  
  async goto() {
    await this.page.goto('/login');
  }
  
  async login(email: string, password: string) {
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
  }
  
  async expectError(message: string) {
    await expect(this.page.getByRole('alert')).toContainText(message);
  }
}

// tests/login.spec.ts
test.describe('User Authentication', () => {
  let loginPage: LoginPage;
  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });
  
  test('successful login', async ({ page }) => {
    await loginPage.login('user@example.com', 'ValidPass123!');
    await expect(page).toHaveURL('/dashboard');
  });
});
```

### Task 3: Generate User Journey Tests

```
Create a complete user journey test:
1. Land on homepage
2. Search for a product
3. Add to cart
4. Proceed to checkout
5. Fill shipping information
6. Complete purchase

Include assertions for each step
```

### Task 4: Generate Accessibility Tests

```
Create accessibility-focused tests:
1. Keyboard navigation through the site
2. Screen reader compatibility checks
3. ARIA attributes verification
4. Focus management tests
5. Color contrast validation
```

## Part 4: Advanced Test Patterns (5 minutes)

### Task 5: Add Test Categories

In Code mode:
```
Organize tests into categories:
1. Smoke tests - critical path only
2. Regression tests - comprehensive coverage
3. Performance tests - loading times
4. Visual tests - screenshot comparisons

Use Playwright tags and projects
```

Example configuration:
```typescript
// playwright.config.ts
export default defineConfig({
  projects: [
    {
      name: 'smoke',
      testMatch: '**/*.smoke.spec.ts',
      timeout: 30000,
    },
    {
      name: 'regression',
      testMatch: '**/*.spec.ts',
      timeout: 60000,
    },
  ],
});
```

### Task 6: Add Retry and Error Handling

```
Enhance tests with:
1. Automatic retry logic for flaky tests
2. Screenshot on failure
3. Video recording for debugging
4. Network request mocking
5. Custom wait strategies
```

### Task 7: Add Data-Driven Tests

```
Create data-driven tests:
1. Multiple user types (admin, user, guest)
2. Different product categories
3. Various payment methods
4. Multiple browsers/devices
Use CSV or JSON test data
```

## Part 5: Run and Debug Tests (5 minutes)

### Task 8: Execute Test Suite

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test login.spec.ts

# Run in headed mode for debugging
npx playwright test --headed

# Run only smoke tests
npx playwright test --grep @smoke

# Generate HTML report
npx playwright show-report
```

### Task 9: Debug Failed Tests

In Code mode:
```
A test is failing intermittently. Add:
1. Better wait conditions
2. More specific selectors
3. Debug logging
4. Slow motion mode for debugging
5. Trace viewer integration
```

## Audience Participation Ideas

### Live Polling
"What would you never want to test manually again?"
- Form validation
- Cross-browser compatibility
- User registration flow
- Payment processing

### Challenge
"Give me your most complex user flow, and let's see if Junie can test it"

### Discussion Points
1. When to use E2E vs unit tests?
2. How many E2E tests are too many?
3. Dealing with test flakiness
4. CI/CD integration strategies

## Key Messages to Emphasize

### The "Wow" Moments

1. **Speed**: "5 minutes from zero to comprehensive test suite"
2. **Quality**: "Better selectors than most senior developers write"
3. **Completeness**: "Edge cases you wouldn't think of"
4. **Maintainability**: "Page Object Model by default"

### Business Value

- Reduce QA cycle time by 70%
- Catch regressions before production
- Enable continuous deployment
- Free QA team for exploratory testing

## Common Questions and Answers

**Q: How accurate are the generated tests?**
A: Very accurate for standard patterns; may need tweaks for custom components

**Q: Can it handle dynamic content?**
A: Yes, with proper wait strategies and assertions

**Q: What about test maintenance?**
A: Page Object Model reduces maintenance burden significantly

**Q: Integration with CI/CD?**
A: Full support for GitHub Actions, Jenkins, GitLab CI, etc.

## Demo Script Outline

### Opening (2 min)
"How many hours does your team spend on manual testing? What if you could automate 80% of it in minutes?"

### Setup (3 min)
- Show MCP configuration
- Explain Playwright capabilities
- Set expectations

### Main Demo (10 min)
- Generate login tests
- Show live execution
- Generate complex user journey
- Highlight accessibility features

### Advanced Features (3 min)
- Show test organization
- Demonstrate debugging tools
- Preview CI integration

### Closing (2 min)
"No more excuses for not having E2E tests. Your future self will thank you."

## Troubleshooting Guide

**Issue**: Playwright MCP not connecting
**Fix**: Ensure npx is in PATH, restart IDE

**Issue**: Tests timeout
**Fix**: Increase timeout, add explicit waits

**Issue**: Selectors not working
**Fix**: Use Playwright inspector to find better selectors

**Issue**: Tests pass locally but fail in CI
**Fix**: Check for environment differences, add screenshots

## Post-Demo Resources

- Playwright documentation: https://playwright.dev
- Example repository with all tests
- Junie + Playwright best practices guide
- CI/CD integration templates

## Metrics to Track

- Time to generate first test: < 2 minutes
- Test execution time: < 30 seconds per test
- Test stability: > 95% pass rate
- Code coverage: Focus on critical paths

## Final Checklist

- [ ] MCP tools configured and working
- [ ] Target application accessible
- [ ] Test project initialized
- [ ] Backup plan if live demo fails
- [ ] Report template ready
- [ ] Time checks at 5, 10, 15 minutes