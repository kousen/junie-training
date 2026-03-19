# Junie Quick Reference Guide

## 🚀 Getting Started

### IDE Installation
1. **IDE**: IntelliJ IDEA / PyCharm / WebStorm / GoLand / PhpStorm / RustRover / RubyMine
2. **Access**: AI Chat panel → Agent dropdown → Select **Junie** (or `Ctrl/Cmd+Alt+J`)
3. **License**: JetBrains AI subscription (AI Credits model) or BYOK

### CLI Installation (Beta)
```bash
# macOS
brew tap jetbrains/junie && brew install junie

# Linux/macOS
curl -fsSL https://junie.jetbrains.com/install.sh | bash
```

### Pricing (AI Credits — 1 Credit = $1 USD)
- **AI Free**: 3 credits/month, no top-ups
- **AI Pro**: $10/month → 10 credits
- **AI Ultimate**: $30/month → 35 credits ($5 bonus)
- **BYOK**: Use your own API keys (OpenAI, Anthropic, Google, Grok)

## 🎯 Core Concepts

### Two Modes
| Mode | Purpose | Use When |
|------|---------|----------|
| **Ask** | Read-only analysis | Understanding, exploring, reviewing |
| **Code** | Make changes | Implementing, fixing, refactoring |

### Safety Levels
| Level | Description | Best For |
|-------|-------------|----------|
| **Approvals** | Review every change | Learning, critical code |
| **Allowlist** | Preview files affected | Team collaboration |
| **Brave** | Autonomous execution | Tests, formatting |

## 📝 Guidelines

**Preferred:** `.junie/AGENTS.md` (open standard) | **Legacy:** `.junie/guidelines.md` (still supported)

Lookup order: `.junie/AGENTS.md` → `AGENTS.md` (project root) → `.junie/guidelines.md`

### Minimal Template
```markdown
## Technology Stack
- Language: Java 17
- Framework: Spring Boot 3.2
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

## ⚡ Common Commands

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
1. Ask: "What tests do we need?"
2. Code: "Generate failing tests"
3. Code: "Implement to pass tests"
```

### Debug Pattern
```
1. Ask: "Analyze this error"
2. Ask: "What's the root cause?"
3. Code: "Fix and add test"
```

### Refactor Pattern
```
1. Code: "Add tests for current behavior"
2. Code: "Refactor maintaining green tests"
3. Ask: "Review improvements"
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
| Wrong coding style | Create/update `.junie/guidelines.md` |
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

## 📊 Model Selection (LLM-Agnostic)

| Provider | Models | Notes |
|----------|--------|-------|
| **OpenAI** | GPT 5, GPT 5.2, GPT 5.2 Codex | |
| **Anthropic** | Opus 4.5, Sonnet 4.5 | |
| **Google** | Gemini 3 Pro, Gemini 3 Flash | |
| **xAI** | Grok 4.1 (Fast) | |

BYOK: Use your own provider API keys via Junie CLI or IDE settings.

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

- **Docs**: jetbrains.com/help/junie/
- **Guidelines**: github.com/JetBrains/junie-guidelines
- **Support**: JetBrains AI Slack
- **This Training**: github.com/kousen/junie-training

## 🚦 Decision Tree

```
Need to understand code?
  → Use ASK mode

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