# Junie Training: AI Coding Agent for JetBrains IDEs

A comprehensive 4-hour hands-on workshop teaching developers how to use Junie, JetBrains' coding agent, across JetBrains IDEs, the Junie CLI, and CI/CD workflows.

## 🎯 Workshop Overview

This training covers:
- **Core Concepts**: Ask, Plan, and Code modes; safety controls; and project guidelines
- **Hands-On Labs**: Practical exercises in Java, Python, and React/TypeScript
- **MCP Integration**: Using external tools like context7 and Playwright where they add value
- **Agent Skills**: Capturing repeatable project workflows in `.junie/skills/`
- **Tool Fit**: When Junie is a better choice than Cursor or other coding agents
- **Best Practices**: Team collaboration, CLI usage, CI/CD integration, and productivity tips

## 📚 Repository Contents

### Slides
- `slides.md` - Source slides in Slidev format (~30 focused slides)
- `slides.pdf` - Exported PDF for distribution

### Labs
- **Lab A (Java)**: Spring Boot REST API with JUnit/AssertJ testing
- **Lab B (Python)**: PEP 8 refactoring with pytest and type hints
- **Lab C (React/TS)**: Form validation with React Testing Library
- **Lab D (MCP)**: Smart dependency upgrades using context7
- **Lab E (Optional Web/TS + OWM)**: Weather app using OpenWeatherMap Geocoding + One Call 3.0 with an Express proxy. New API keys may take 30-60 minutes to activate.
- **Mini-Lab F (Skills)**: Create a reusable Playwright E2E Skill and use local Playwright CLI for repeatable test runs

### Resources
- **Cheat Sheets**: Quick reference for Junie commands and MCP tools
- **Sample Prompts**: Ready-to-use prompts for common tasks
- **Quick Reference**: One-page guide with essential information
- **Junie Skills**: Reusable task workflows in `.junie/skills/`
- **Git Cheat Sheet**: Common workshop git flows (cherry-pick, tags, cleanup) — see `docs/git-cheatsheet.md`

### Demo
- **Playwright Demo**: E2E test generation and Skill-driven local Playwright workflows

## 🚀 Prerequisites

### For Instructors
- Node.js 18+ (for Slidev)
- JetBrains IDE with Junie via the AI Chat agent dropdown, and preferably Junie CLI
- JetBrains AI subscription, Junie API key, or BYOK provider key

### For Participants
- JetBrains IDE (IntelliJ IDEA, PyCharm, WebStorm, GoLand, PhpStorm, RustRover, or RubyMine)
- JetBrains AI subscription (AI Credits: 1 Credit = $1 USD), Junie API key, or BYOK with your own API keys
- Development environment (Java 21+, Python 3.8+, or Node.js 18+)

**Note on Pricing (AI Credits):**
- **AI Free**: 3 credits/month, no top-ups
- **AI Pro** ($10/month): 10 credits
- **AI Ultimate** ($30/month): 35 credits ($5 bonus)
- **BYOK**: Use your own provider keys (OpenAI, Anthropic, Google, xAI, OpenRouter, GitHub Copilot, or local runtimes) where supported

## 💻 Running the Slides

```bash
# Install Slidev globally (first time only)
npm install -g @slidev/cli

# Start the development server
npx slidev slides.md

# View at http://localhost:3030
```

### Exporting Slides

```bash
# Export to PDF
npx slidev export slides.md --format pdf --output slides.pdf --dark
```

## 🧪 Lab Setup

Most lab directories contain:
- `README.md` - Detailed step-by-step instructions (renders automatically on GitHub)
- `.junie/AGENTS.md` - Example project guidelines; legacy `.junie/guidelines.md` may also be present
- Starter code and configuration files

### Lab Structure

1. **Part 1**: Project setup and exploration
2. **Part 2**: Ask mode analysis and Plan mode alignment
3. **Part 3**: Full-prompt implementation with tests
4. **Part 4**: Review, refine guidelines, and compare results

## 📖 Workshop Agenda

| Time | Topic | Duration |
|------|-------|----------|
| 0:00 | Orientation & Setup | 25 min |
| 0:25 | Surfaces, Safety, and Plan Mode | 70 min |
| 1:35 | Break | 10 min |
| 1:45 | Cross-Language Labs | 70 min |
| 2:55 | Remote, MCP, Skills, and Cursor Comparison | 45 min |
| 3:40 | Wrap-up & Q&A | 20 min |

## 🎓 Learning Objectives

By the end of this workshop, participants will be able to:
- Navigate between Ask and Code modes effectively
- Use Plan mode to align on requirements, design, tests, and delivery steps
- Create and apply project guidelines for consistency
- Generate comprehensive test suites with AI assistance
- Integrate MCP tools for enhanced capabilities
- Create a project Skill for repeatable team workflows
- Apply safety controls appropriately (Approvals, Allowlist, Brave Mode)
- Implement AI-assisted TDD and refactoring workflows
- Explain when Junie, Cursor, Codex, Claude, or Antigravity is the better workflow fit

## 📝 Key Concepts

### Operating Modes
- **Ask Mode**: Read-only analysis for understanding code
- **Plan Mode**: Requirements, technical design, testing strategy, and delivery steps before implementation
- **Code Mode**: Active implementation with file modifications

### Safety Controls
- **Approvals Mode**: Review every change before applying
- **Action Allowlist**: Preview affected files upfront
- **Brave Mode**: Autonomous execution for trusted tasks

### Project Guidelines
Located in `.junie/AGENTS.md`, root `AGENTS.md`, or legacy `.junie/guidelines.md`, these files encode:
- Technology stack and frameworks
- Coding conventions and patterns
- Testing approaches
- Common antipatterns to avoid

## 🔧 MCP Tools

### context7
- Real-time library documentation
- Version compatibility checking
- Migration guides
- No API key required

### Playwright
- E2E test generation
- Browser automation
- Accessibility testing
- TypeScript output

For repeatable Playwright workflows, prefer a Skill that teaches Junie your team's conventions and then run Playwright through the local CLI.

## 📚 Additional Resources

### Documentation
- [Getting Started with Junie](https://junie.jetbrains.com/docs/get-started-with-junie.html)
- [Junie CLI](https://junie.jetbrains.com/docs/junie-cli.html)
- [Remote Mode](https://junie.jetbrains.com/docs/junie-cli-remote-mode.html)
- [Guidelines and Memory](https://junie.jetbrains.com/docs/guidelines-and-memory.html)
- [Agent Skills](https://junie.jetbrains.com/docs/agent-skills.html)
- [MCP](https://junie.jetbrains.com/docs/mcp.html)

### GitHub Resources
- [Junie Guidelines Catalog](https://github.com/JetBrains/junie-guidelines)
- [Context7 MCP](https://github.com/upstash/context7)

## 🚀 After the Workshop

Three things to try this week to make the workshop stick:

1. **Add an `AGENTS.md` to one real project.** Ask Junie to draft it from the existing code,
   then refine it. Re-run a recent task and compare the output.
2. **Create one Skill** in `.junie/skills/` for a workflow your team repeats (test conventions,
   review checklist, endpoint scaffolding). Use Mini-Lab F as the template.
3. **Wire Junie into one repo's CI** with the GitHub Action or GitLab CI, and try a
   `@junie-agent` comment on a throwaway PR.

Then pick your default safety posture (Approvals → Allowlist → Brave) and your default model
(`/model`), and keep an eye on `/usage` until you have a feel for credit consumption.

## 👤 Instructor

**Ken Kousen**  
President, Kousen IT, Inc.

- 📧 ken.kousen@kousenit.com
- 🐙 [github.com/kousen](https://github.com/kousen)
- 📺 [@talesfromthejarside](https://youtube.com/@talesfromthejarside)
- 📝 [kousenit.substack.com](https://kousenit.substack.com)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- JetBrains for creating Junie and supporting AI-powered development
- The Slidev team for the excellent presentation framework
- All contributors to the MCP ecosystem

---

**Remember**: AI agents aren't here to replace developers—they're here to make us better developers!
