# Playwright Demo: Interactive Browser Exploration with MCP

## Duration: 10-15 minutes (optional)

## Where this fits

This is the **interactive, exploratory** counterpart to [Mini-Lab F](../labs/labF-playwright-skill/README.md):

- **Use Playwright MCP (this demo)** when you want Junie to drive a real browser live —
  inspect a page, find selectors, and sketch tests against a running site.
- **Use a Playwright Skill (Mini-Lab F)** when you want repeatable team conventions and
  local `npx playwright test` runs without depending on the MCP server.

> **Four-hour course note:** prefer Mini-Lab F. Run this MCP demo only if you have spare
> time and want to show interactive browser context. The two are complementary, not
> competing — pick the one that fits your goal.

## Prerequisites

- WebStorm or another JetBrains IDE with Junie (or Junie CLI)
- Node.js 18+
- This `demo-playwright` folder (`npm install` once)
- Optional: Playwright MCP configured for interactive browser exploration

## Part 1: Configure Playwright MCP (Optional, 3 minutes)

In Junie Settings → MCP (or `/mcp` in the CLI), add:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"]
    }
  }
}
```

Restart Junie and confirm Playwright shows as connected.

## Part 2: Explore a Page (5 minutes)

Pick a stable target. Public demo sites work, but they can be slow or change without
notice — have a fallback (a screenshot or a local page) ready in case one is down:

- TodoMVC — https://todomvc.com/examples/react
- Applitools demo — https://demo.applitools.com

In Ask mode:

```
Using the Playwright MCP, open <site URL> and describe:
1. The key user flows worth testing
2. The accessible roles and labels available for selectors
3. Anything that would make a test flaky (dynamic content, timing)
```

The point to make: the agent is reading a *real* rendered page, not guessing from source.

## Part 3: Sketch a Test, Then Move It Local (5 minutes)

```
Draft a Playwright test in TypeScript for the primary flow you found.
Prefer accessible locators (getByRole, getByLabel). Avoid arbitrary waits.
```

Then make the teaching point explicit:

- MCP is great for *this* interactive exploration.
- For tests your team runs every day, capture the conventions in a Skill (Mini-Lab F)
  and run them with local `npx playwright test`, which doesn't depend on the MCP server.

## A runnable starting point

This folder ships one small, stable test (`tests/example.spec.ts`) so you can show a real
green run without depending on a live demo site:

```bash
npm install
npx playwright install chromium   # first time only
npm test
```

From here, Junie (via MCP or the `playwright-e2e` Skill) can add or improve tests against
a target of your choosing.

## Discussion Prompts

1. When is an E2E test worth the maintenance cost versus a unit test?
2. How do you keep browser tests from becoming flaky?
3. Where does test running belong — local CLI, CI, or both?

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Playwright MCP not connecting | Ensure `npx` is on PATH; restart the IDE |
| `npx playwright test` finds no browser | Run `npx playwright install chromium` |
| Demo site slow or down | Switch targets, or use the local `example.spec.ts` |
| Selectors don't match | Use accessible roles/labels; inspect with `npx playwright codegen` |

## Resources

- Playwright docs: https://playwright.dev
- Mini-Lab F (Skill-based approach): [../labs/labF-playwright-skill/README.md](../labs/labF-playwright-skill/README.md)
