# Junie Commands Cheat Sheet

## Opening Junie
- **View → Tool Windows → Junie** (or click Junie icon in sidebar)
- **Keyboard**: `Ctrl+Alt+J` (Windows/Linux) or `Cmd+Alt+J` (Mac)

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
2. Code: "Generate failing tests for [feature]"
3. Code: "Implement [feature] to make tests pass"

### Refactoring Workflow
1. Code: "Generate tests for existing functionality"
2. Ask: "What refactoring opportunities exist?"
3. Code: "Refactor while keeping tests green"

### Bug Fix Workflow
1. Ask: "Analyze this error and explain the root cause"
2. Code: "Fix the bug and add a test to prevent regression"

### Documentation Workflow
1. Ask: "What key behaviors need documentation?"
2. Code: "Add comprehensive JavaDoc/docstrings"

## Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|--------------|-----|
| Open Junie | `Ctrl+Alt+J` | `Cmd+Alt+J` |
| Execute | `Ctrl+Enter` | `Cmd+Enter` |
| Cancel | `Esc` | `Esc` |
| Undo | `Ctrl+Z` | `Cmd+Z` |

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

## Tips for Success

1. **Start with Ask Mode** - Understand before changing
2. **Use Guidelines** - Maintain consistency across the team
3. **Review Diffs Carefully** - Even in Brave Mode, check the results
4. **Be Iterative** - Break complex tasks into steps
5. **Save Good Prompts** - Build a library of effective prompts

## Common Issues

### Junie doesn't understand context
**Solution**: Provide more specific details or use Ask mode first

### Generated code doesn't follow standards
**Solution**: Create or update `.junie/guidelines.md`

### Changes are too broad
**Solution**: Break into smaller, specific requests

### Tests are failing
**Solution**: Ask Junie to "run tests and fix any failures"