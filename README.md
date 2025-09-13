# Junie Training: AI Coding Agent for JetBrains IDEs

A comprehensive 4-hour hands-on workshop teaching developers how to effectively use Junie, JetBrains' AI-powered coding agent, across IntelliJ IDEA, PyCharm, and WebStorm.

## 🎯 Workshop Overview

This training covers:
- **Core Concepts**: Ask vs Code modes, safety controls, and project guidelines
- **Hands-On Labs**: Practical exercises in Java, Python, and React/TypeScript
- **MCP Integration**: Using external tools like context7 and Playwright
- **Best Practices**: Team collaboration, CI/CD integration, and productivity tips

## 📚 Repository Contents

### Slides
- `slides.md` - Source slides in Slidev format (60+ slides)
- `slides.pdf` - Exported PDF for distribution
- `slides.pptx` - Editable PowerPoint version

### Labs
- **Lab A (Java)**: Spring Boot REST API with JUnit/AssertJ testing
- **Lab B (Python)**: PEP 8 refactoring with pytest and type hints
- **Lab C (React/TS)**: Form validation with React Testing Library
- **Lab D (MCP)**: Smart dependency upgrades using context7
- **Lab E (Web/TS + OWM)**: Weather app using OpenWeatherMap Geocoding + One Call 3.0 with an Express proxy (see `labs/labE-web-owm-weather`). New API keys may take 30–60 minutes to activate.

### Resources
- **Cheat Sheets**: Quick reference for Junie commands and MCP tools
- **Sample Prompts**: Ready-to-use prompts for common tasks
- **Quick Reference**: One-page guide with essential information
- **Git Cheat Sheet**: Common workshop git flows (cherry-pick, tags, cleanup) — see `docs/git-cheatsheet.md`

### Demo
- **Playwright Demo**: E2E test generation using MCP integration

## 🚀 Prerequisites

### For Instructors
- Node.js 16+ (for Slidev)
- JetBrains IDE with Junie plugin
- JetBrains AI Pro subscription

### For Participants
- JetBrains IDE (IntelliJ IDEA, PyCharm, or WebStorm)
- JetBrains AI Pro subscription
- Development environment (Java 17+, Python 3.8+, or Node.js 16+)

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

# Export to PowerPoint
npx slidev export slides.md --format pptx --output slides.pptx --dark
```

## 🧪 Lab Setup

Each lab directory contains:
- `LAB_INSTRUCTIONS.md` - Detailed step-by-step instructions
- `.junie/guidelines.md` - Example project guidelines
- Starter code and configuration files

### Lab Structure

1. **Part 1**: Project setup and exploration
2. **Part 2**: Working without guidelines
3. **Part 3**: Adding guidelines and comparing results
4. **Part 4**: Advanced features and extensions

## 📖 Workshop Agenda

| Time | Topic | Duration |
|------|-------|----------|
| 0:00 | Orientation & Setup | 30 min |
| 0:30 | Core Workflow + Guidelines | 45 min |
| 1:15 | Break | 10 min |
| 1:25 | Cross-Language Labs | 60 min |
| 2:25 | MCP in Action | 45 min |
| 3:10 | Wrap-up & Q&A | 20 min |

## 🎓 Learning Objectives

By the end of this workshop, participants will be able to:
- Navigate between Ask and Code modes effectively
- Create and apply project guidelines for consistency
- Generate comprehensive test suites with AI assistance
- Integrate MCP tools for enhanced capabilities
- Apply safety controls appropriately (Approvals, Allowlist, Brave Mode)
- Implement AI-assisted TDD and refactoring workflows

## 📝 Key Concepts

### Operating Modes
- **Ask Mode**: Read-only analysis for understanding code
- **Code Mode**: Active implementation with file modifications

### Safety Controls
- **Approvals Mode**: Review every change before applying
- **Action Allowlist**: Preview affected files upfront
- **Brave Mode**: Autonomous execution for trusted tasks

### Project Guidelines
Located in `.junie/guidelines.md`, these files encode:
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

## 📚 Additional Resources

### Documentation
- [Getting Started with Junie](https://www.jetbrains.com/help/junie/get-started-with-junie.html)
- [Guidelines Documentation](https://www.jetbrains.com/help/junie/customize-guidelines.html)
- [MCP Settings Guide](https://www.jetbrains.com/help/junie/mcp-settings.html)

### GitHub Resources
- [Junie Guidelines Catalog](https://github.com/JetBrains/junie-guidelines)
- [Context7 MCP](https://github.com/upstash/context7)

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
