# Junie Quick Reference Guide

## 🚀 Getting Started

### IDE Installation
1. **IDE**: IntelliJ IDEA / PyCharm / WebStorm / GoLand / PhpStorm / RustRover / RubyMine
2. **Access**: AI Chat panel → Agent dropdown → Select **Junie** (or `Ctrl/Cmd+Alt+J`)
3. **License**: JetBrains AI subscription (AI Credits model) or BYOK

### CLI Installation
```bash
# macOS
brew tap jetbrains-junie/junie && brew install junie

# Linux/macOS
curl -fsSL https://junie.jetbrains.com/install.sh | bash

# npm
npm install -g @jetbrains/junie-cli
```

### Pricing (AI Credits — 1 Credit = $1 USD)
- **AI Free**: 3 credits/month, no top-ups
- **AI Pro**: $10/month → 10 credits
- **AI Ultimate**: $30/month → 35 credits ($5 bonus)
- **BYOK**: Use your own API keys (OpenAI, Anthropic, Google, xAI, OpenRouter, GitHub Copilot, or local runtimes where supported)

## 🎯 Core Concepts

### Three Modes
| Mode | Purpose | Use When |
|------|---------|----------|
| **Ask** | Read-only analysis | Understanding, exploring, reviewing |
| **Plan** | Requirements, design, testing, delivery steps | Larger changes, unclear scope, high-risk edits |
| **Code** | Make changes | Implementing, fixing, refactoring |

### Safety Levels
| Level | Description | Best For |
|-------|-------------|----------|
| **Approvals** | Review every change | Learning, critical code |
| **Allowlist** | Preview files affected | Team collaboration |
| **Brave** | Autonomous execution | Tests, formatting |

## 📝 Guidelines

**Preferred:** `.junie/AGENTS.md` (open standard) | **Also supported:** root `AGENTS.md` | **Legacy:** `.junie/guidelines.md`

Lookup order: `.junie/AGENTS.md` → `AGENTS.md` (project root) → `.junie/guidelines.md`

### Minimal Template
```markdown
## Technology Stack
- Language: Java 21
- Framework: Spring Boot 3.5
- Testing: JUnit 5 + AssertJ

## Conventions
- REST: /api/v1/{resource}
- DTOs: Use records
- Tests: Given-When-Then
```

## 🔧 MCP Tools

### context7 (Library Documentation)
```
"Use context7 to get React 18 migration guide"
"Find latest stable version of Express"
"Check breaking changes for Angular 15"
```

### Playwright (E2E Tests)
```
"Generate Playwright tests for login flow"
"Create page objects for all forms"
"Add accessibility tests"
```

For repeatable Playwright conventions, create a Skill and run `npx playwright test` locally.

## ⚡ Common Commands

### Junie CLI
```bash
junie
junie "Add tests for the registration form"
junie --review
junie --model sonnet
junie --help
```

### Slash Commands
| Command | Use |
|---------|-----|
| `/plan <task>` | Create a plan before implementation |
| `/mcp` | Configure or inspect MCP servers |
| `/model` | Switch models |
| `/usage` | Check usage and credits |
| `/review` | Review local changes |
| `/remote` | Continue a CLI session in the browser |

### Remote Mode
```bash
junie
/remote
```

Open `junie.jetbrains.com/remote` in a browser, including a phone browser. The terminal session keeps running on your machine. Stop sharing by running `/remote` again in the terminal.

Remote mode uses the Junie service. JetBrains Account sign-in is the simplest path; a `JUNIE_API_KEY` is the alternate route. BYOK-only setups may need additional Junie authentication.

### Agent Skills
Project Skills live in `.junie/skills/<skill-name>/SKILL.md`.

Useful examples in this repo:
- `add-rest-endpoint`
- `add-tests`
- `code-review`
- `playwright-e2e` (created in Mini-Lab F)

### Quick Wins
- `"Explain this code"` - Understand complex logic
- `"Add tests with 80% coverage"` - Generate test suite
- `"Fix all ESLint errors"` - Clean up code
- `"Add comprehensive logging"` - Improve debugging

### Project Setup
- `"Create project structure for [framework]"`
- `"Set up testing environment"`
- `"Add Docker configuration"`
- `"Create CI/CD pipeline"`

## 🎨 Workflow Patterns

### TDD Pattern
```
1. Ask: "What tests should fail for this behavior?"
2. Plan: "Create an implementation and testing plan"
3. Code: "Implement the plan and run the tests"
```

### Debug Pattern
```
1. Ask: "Analyze this error"
2. Ask: "What's the root cause?"
3. Code: "Fix and add test"
```

### Refactor Pattern
```
1. Ask: "Characterize current behavior and risk"
2. Plan: "Plan a safe refactor with tests"
3. Code: "Refactor while keeping tests green"
```

## 💡 Pro Tips

### DO's ✅
- Start with Ask mode
- Be specific in prompts
- Review all diffs
- Use guidelines
- Test generated code

### DON'Ts ❌
- Skip diff review
- Use Brave mode initially
- Ignore test failures
- Forget guidelines
- Make huge changes at once

## 🔍 Troubleshooting

| Problem | Solution |
|---------|----------|
| Junie doesn't understand | Provide more context, use Ask mode first |
| Wrong coding style | Create/update `.junie/AGENTS.md` |
| Tests failing | Ask to "run tests and fix failures" |
| Too many changes | Break into smaller requests |
| Slow response | Reduce scope, be more specific |

## ⌨️ Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|--------------|-----|
| Open Junie | `Ctrl+Alt+J` | `Cmd+Alt+J` |
| Execute | `Ctrl+Enter` | `Cmd+Enter` |
| Cancel | `Esc` | `Esc` |
| Undo | `Ctrl+Z` | `Cmd+Z` |

### CLI Shortcuts
| Shortcut | Action |
|----------|--------|
| `Shift+Tab` | Toggle Plan mode |
| `Ctrl+B` | Toggle Brave mode |
| `Ctrl+R` | Search prompt history |
| `Ctrl+T` | Show transcript |

## 📊 Model Selection (LLM-Agnostic)

| Provider | Alias | Notes |
|----------|-------|-------|
| **OpenAI** | `gpt`, `gpt-codex` | |
| **Anthropic** | `opus`, `sonnet` | |
| **Google** | `gemini-pro`, `gemini-flash` | |
| **xAI** | `grok` | |

Aliases always point to the latest supported version. BYOK: Use your own provider API keys via Junie CLI or IDE settings.

## 🎯 Prompt Templates

### Feature Implementation
```
Create [feature] with:
- [Requirement 1]
- [Requirement 2]
- Tests with [X]% coverage
- Documentation
Follow our guidelines
```

### Plan First
```
Before making changes, create a plan that covers:
- Requirements and assumptions
- Technical design
- Tests you will add or update
- Files you expect to touch
Wait for my approval before implementing.
```

### Bug Fix
```
Fix [issue description]:
- Root cause: [if known]
- Expected behavior: [description]
- Add test to prevent regression
```

### Refactoring
```
Refactor [component] to:
- Follow [pattern/principle]
- Maintain backward compatibility
- Improve [metric]
- Keep tests passing
```

## 📚 Resources

- **Docs**: junie.jetbrains.com/docs/
- **Guidelines**: github.com/JetBrains/junie-guidelines
- **Support**: JetBrains AI Slack
- **This Training**: github.com/kousen/junie-training

## 🚦 Decision Tree

```
Need to understand code?
  → Use ASK mode

Need alignment before changing code?
  → Use PLAN mode

Ready to make changes?
  → Use CODE mode
  
First time with this task?
  → Use APPROVALS
  
Repetitive/safe task?
  → Consider BRAVE mode
  
Team project?
  → Add guidelines first
```

---

**Remember**: AI amplifies good practices - invest in your guidelines!
