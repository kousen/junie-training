# Junie Commands Cheat Sheet

## Opening Junie

### IDE
- **AI Chat panel → Agent dropdown → Junie**
- **Or**: View → Tool Windows → Junie (standalone Junie tool window)
- **Keyboard**: `Ctrl+Alt+J` (Windows/Linux) or `Cmd+Alt+J` (Mac)

### CLI
- **Terminal**: Run `junie` in any project directory
- **Auth**: JetBrains account, `JUNIE_API_KEY`, or BYOK with your own provider keys
- **Non-interactive**: `junie "Fix the failing tests"` or `junie --review`

## Mode Selection

### Ask Mode (Read-Only Analysis)
Use when you want to:
- Understand existing code
- Get explanations
- Review architecture
- Find bugs without fixing
- Check test coverage

**Example prompts:**
```
"Explain how this authentication service works"
"What design patterns are used in this codebase?"
"Find potential security issues in the UserController"
"What's the test coverage for the payment module?"
```

### Plan Mode (Align Before Editing)
Use when you want to:
- Clarify requirements
- See the implementation strategy
- Confirm expected files and tests
- Reduce scope drift
- Teach participants how to critique agent plans

**Ways to start:**
```
Shift+Tab
/plan Add a validated registration form with tests
```

**Example prompts:**
```
"Create a plan for adding this endpoint. Include requirements, design, tests, and risks. Wait for approval before coding."
"Before editing, inspect the project and propose a migration plan from React 17 to React 18."
```

### Code Mode (Make Changes)
Use when you want to:
- Implement features
- Fix bugs
- Generate tests
- Refactor code
- Update dependencies

**Example prompts:**
```
"Add a GET /api/users endpoint with pagination"
"Fix the null pointer exception in OrderService"
"Generate unit tests for UserValidator with 90% coverage"
"Refactor this class to use dependency injection"
```

## Effective Prompts

### Be Specific
❌ "Make it better"
✅ "Refactor this method to reduce cyclomatic complexity below 10"

### Provide Context
❌ "Add validation"
✅ "Add email and phone validation to the registration form using regex patterns"

### Specify Constraints
❌ "Write tests"
✅ "Write JUnit 5 tests using AssertJ assertions and achieve 85% coverage"

## Safety Controls

### Approvals Mode (Default)
- Review every change before applying
- Use for: Critical code, learning Junie

### Action Allowlist
- Preview which files will be modified
- Use for: Defined scope changes

### Brave Mode
- Autonomous execution
- Use for: Test generation, formatting, documentation

## Common Workflows

### TDD Workflow
1. Ask: "What test cases should we have for [feature]?"
2. Plan: "Create an implementation and testing plan"
3. Code: "Implement [feature] and run the tests"

### Refactoring Workflow
1. Ask: "What behavior must stay unchanged?"
2. Plan: "Plan a safe refactor with tests"
3. Code: "Refactor while keeping tests green"

### Bug Fix Workflow
1. Ask: "Analyze this error and explain the root cause"
2. Plan: "Show the smallest fix and regression test"
3. Code: "Fix the bug and add a test to prevent regression"

### Documentation Workflow
1. Ask: "What key behaviors need documentation?"
2. Code: "Add comprehensive JavaDoc/docstrings"

## IDE Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|--------------|-----|
| Open Junie | `Ctrl+Alt+J` | `Cmd+Alt+J` |
| Execute | `Ctrl+Enter` | `Cmd+Enter` |
| Cancel | `Esc` | `Esc` |
| Undo | `Ctrl+Z` | `Cmd+Z` |

## CLI Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Shift+Tab` | Toggle Plan Mode (read-only analysis) |
| `Ctrl+B` | Toggle Brave Mode |
| `Ctrl+R` | Search prompt history across sessions |
| `Ctrl+T` | View full session transcript |
| `/plan` | Create a plan before implementation |
| `/mcp` | Configure or inspect MCP servers |
| `/model` | Choose or switch models |
| `/usage` | Check usage and credits |
| `/review` | Review local changes |
| `/remote` | Continue the CLI session in a browser |
| `/ide` | Connect the CLI to a matching JetBrains IDE |

## Remote Mode

Remote mode lets you keep working with the same running CLI session from a browser, including a phone browser.

1. Start `junie` in a project.
2. Run `/remote`.
3. Open `junie.jetbrains.com/remote`.
4. Send a prompt, answer an approval, refine a plan, or monitor progress.
5. Run `/remote` again in the terminal to stop the remote session.

Notes:
- Your machine must stay awake.
- Slash commands remain terminal-only.
- Remote mode uses the Junie service. JetBrains Account sign-in is the simplest path; a `JUNIE_API_KEY` is the alternate route. BYOK-only setups may need additional Junie authentication.

## MCP Tool Commands

### Using context7
```
"Use context7 to get the latest React 18 migration guide"
"Check breaking changes for upgrading from Spring Boot 2 to 3"
"Find the recommended version of lodash for production"
```

### Using Playwright
```
"Generate Playwright E2E tests for the login flow"
"Create page object models for all forms"
"Add accessibility tests for the dashboard"
```

For repeatable Playwright conventions, prefer an Agent Skill plus local `npx playwright test`.

## Agent Skills

Skills live in `.junie/skills/<skill-name>/SKILL.md` for a project, or `~/.junie/skills/<skill-name>/SKILL.md` for your user account.

Useful workshop Skills:
- `add-rest-endpoint`: REST endpoint scaffolding conventions
- `add-tests`: test coverage workflow
- `code-review`: review checklist
- `playwright-e2e`: created in Mini-Lab F

## Tips for Success

1. **Start with Ask Mode** - Understand before changing
2. **Use Plan Mode for larger changes** - Align on requirements, design, and tests
3. **Use Guidelines** - Maintain consistency across the team
4. **Review Diffs Carefully** - Even in Brave Mode, check the results
5. **Prefer full prompts for labs** - Save time and show stronger agent behavior

## Common Issues

### Junie doesn't understand context
**Solution**: Provide more specific details or use Ask mode first

### Generated code doesn't follow standards
**Solution**: Create or update `.junie/AGENTS.md` (or legacy `.junie/guidelines.md`)

### Changes are too broad
**Solution**: Ask for a plan first, then approve only the first contained slice

### Tests are failing
**Solution**: Ask Junie to "run tests and fix any failures"
