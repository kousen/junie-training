# Mini-Lab F: Create a Playwright Skill

## Duration: 10-15 minutes

## Learning Objectives

- Explain when a Skill is better than MCP.
- Ask Junie to create a reusable project Skill.
- Use the Skill to generate or improve Playwright tests.
- Run Playwright locally through the normal CLI.

## Prerequisites

- Junie CLI or a JetBrains IDE with Junie.
- Node.js 18+.
- The `demo-playwright` folder from this repository.
- Optional: Playwright browsers installed with `npx playwright install`.

## Why This Lab Exists

Playwright can be exposed to Junie through MCP for interactive browser exploration. For repeatable team testing conventions, a Skill is often a better fit:

- MCP answers "what external tool can the agent use right now?"
- Skills answer "what workflow should the agent follow every time?"

In this lab, Playwright itself remains a local CLI tool. The Skill teaches Junie how your team wants browser tests designed, written, and verified.

## Part 1: Inspect Existing Skills (2 minutes)

From the repository root, inspect:

```bash
find .junie/skills -maxdepth 2 -type f -name SKILL.md -print
```

Open one of the existing skills:

- `.junie/skills/add-tests/SKILL.md`
- `.junie/skills/code-review/SKILL.md`
- `.junie/skills/add-rest-endpoint/SKILL.md`

Notice the structure:

- YAML frontmatter with `name` and `description`
- Focused, reusable instructions
- Optional checklists, scripts, templates, or references

## Part 2: Ask Junie to Create a Skill (5 minutes)

Start Junie from the repository root and use this prompt:

```text
Create a project Skill named playwright-e2e in .junie/skills/playwright-e2e.

The Skill should guide Junie when creating or improving Playwright tests:
- Prefer user-visible behavior over implementation details
- Prefer accessible locators such as getByRole and getByLabel
- Use page objects only after selector or navigation duplication appears
- Keep tests deterministic and avoid arbitrary sleeps
- Run npx playwright test after changes when dependencies are installed
- Summarize failures, trace/report locations, and screenshots
- Do not require Playwright MCP for repeatable local test runs

Include a concise SKILL.md with good frontmatter. Add a small checklist file if helpful.
```

Review the generated files before accepting them.

## Part 3: Use the Skill (5 minutes)

Keep Junie running from the repository root so it can discover `.junie/skills/`, and point it at the demo folder.

Ask Junie:

```text
Use the playwright-e2e Skill to review demo-playwright and propose one focused improvement. If you make a change, run cd demo-playwright && npx playwright test or explain why it cannot run here.
```

Good demo outcomes:

- Junie mentions the Skill or follows its rules without a long re-prompt.
- Generated tests use accessible locators.
- Junie prefers local `npx playwright test` over Playwright MCP for repeatable verification.
- Failure summaries include report or trace locations when available.

## Part 4: Optional Review (3 minutes)

If there are local changes, run Junie's review agent:

```text
/review focus on Playwright test quality and selector robustness
```

Discuss how review differs from implementation:

- Review is read-only.
- It focuses on the diff.
- It can use project guidelines and relevant Skills.

## Reflection Questions

1. What changed when the workflow lived in a Skill instead of the prompt?
2. What would you put in a team-global Skill versus a project Skill?
3. When would Playwright MCP still be better than local Playwright CLI?
4. Which Skill would your team create first?
