# Junie: Capabilities & Limitations

## What Junie IS

### ✅ Core Capabilities

**Autonomous Code Operations**
- Navigate and understand entire project structure
- Execute terminal commands and scripts
- Run test suites and verify results
- Modify multiple files in coordinated changes
- Maintain context across complex tasks

**IDE Integration**
- Native integration with JetBrains IDEs
- Access to project indexes and search
- Integration with IDE refactoring tools
- Respects IDE code style settings
- Works with IDE debugging tools

**Safety & Control**
- Three levels of safety (Approvals, Allowlist, Brave)
- Preview all changes before applying
- Audit trail of actions taken
- Diff review before accepting work
- Git and IDE rollback workflows remain available

**External Tool Integration**
- MCP (Model Context Protocol) support
- Connect to documentation sources (context7)
- Explore browser workflows with Playwright MCP when interactive browser context helps
- Extensible with custom MCP servers

**Agent Skills**
- Reusable task-specific workflows in `.junie/skills/`
- Project Skills can be versioned with the repo
- User Skills can live in `~/.junie/skills/`
- Useful for test conventions, code review checklists, endpoint scaffolding, and Playwright E2E standards

**Model Selection (LLM-Agnostic)**
- Multiple providers: OpenAI, Anthropic, Google, xAI, OpenRouter, GitHub Copilot, and local runtimes where supported
- BYOK (Bring Your Own Key) with any supported provider
- Ability to switch models mid-conversation
- The CLI model picker may show provider and local models rather than a JetBrains-branded model; authentication and model selection are related but distinct.

## What Junie IS NOT

### ❌ Boundaries to Remember

**Surface Differences**
- Some features are CLI-first, such as slash commands, `/mcp`, `/review`, `/remote`, and non-interactive `junie "<prompt>"`
- Some features are IDE-first, such as debugger-backed workflows, inspections, refactorings, and richer project indexing
- CI/CD uses GitHub Actions or GitLab CI rather than an interactive IDE session
- Remote mode is a browser UI for a running CLI session, including phone browsers; it is not a replacement for the terminal

**Product Boundaries**
- Junie is a coding agent, not a project manager
- It can run local commands, but you still own secrets, deployments, and production changes
- It can use MCP tools, but MCP results still need verification

**No Voice Input**
- Text-only interaction
- No voice commands or dictation

**No Real-time Collaboration**
- Single-user tool
- No live sharing of Junie sessions
- Guidelines shared via version control only

## 📊 Comparison with Other AI Coding Tools

| Question | Junie | Cursor | Other Coding Agents |
|----------|-------|--------|---------------------|
| **Where does the project live?** | JetBrains IDE, CLI, CI/CD | Cursor editor, CLI, background agents, ACP integrations | Terminal, desktop app, cloud, browser, or IDE plugins |
| **Best fit** | Teams already using JetBrains inspections, refactorings, debugger, and project models | Teams that want an AI-first editor and Cursor rules | Teams centered on a provider or workflow, such as Codex, Claude, or Antigravity |
| **Plan-first workflow** | First-class Plan mode and plan review | Agent planning available through prompts/workflows | Varies by tool |
| **Guidelines** | `.junie/AGENTS.md`, root `AGENTS.md`, legacy `.junie/guidelines.md` | Cursor rules | Tool-specific instructions such as `AGENTS.md`, `CLAUDE.md`, or repo docs |
| **MCP** | Supported | Supported | Often supported, tool-dependent |
| **Classroom comparison** | Use the same repo, same task, same tests | Compare plan quality, diffs, and verification | Compare context, review, and recovery workflow |

## 🚫 Current Limitations

### File & Project Limitations
- **File size**: Large files may timeout
- **Binary files**: Cannot read/modify binary files
- **Project size**: Performance degrades with very large projects
- **Network drives**: May have issues with remote filesystems

### Language & Framework Limitations
- **Best support**: Java, Python, JavaScript/TypeScript
- **Limited support**: Some newer languages/frameworks
- **No support**: Proprietary/obscure languages

### Operational Limitations
- **Token limits**: Model-dependent (varies by provider and model)
- **Context window**: Can lose context in very long conversations
- **Execution time**: Complex operations may timeout
- **Network required**: Cloud models require network access; local models require local runtime setup

### Integration Limitations
- **Git**: Basic operations only, no complex workflows
- **Databases**: Cannot directly query databases
- **Cloud services**: No direct cloud API access
- **Containers**: Limited Docker/K8s interaction

## 💡 Working Within Limitations

### Token Management
- Break large tasks into smaller chunks
- Clear context when switching tasks
- Use Ask mode for analysis to save tokens
- Be specific to reduce back-and-forth

### Context Management
- Start new conversations for unrelated tasks
- Summarize previous work when continuing
- Use guidelines to maintain consistency
- Reference specific files rather than "the project"

### Performance Optimization
- Close unnecessary files in IDE
- Use specific file paths when possible
- Limit scope of search operations
- Run tests selectively, not entire suite

### Error Recovery
- Save work frequently
- Use version control for checkpoints
- Keep Approvals mode for critical changes
- Have rollback plan ready

## 🔮 Recent and Upcoming Features

### Current Course-Relevant Features (June 2026)
- **Junie is out of beta** — available across JetBrains IDEs, CLI, and CI/CD workflows
- **Plan Mode** — requirements, technical design, testing strategy, and delivery steps before implementation
- **Junie CLI** — interactive and non-interactive coding-agent workflows from the terminal
- **AGENTS.md** — open-standard project guidance, with legacy `.junie/guidelines.md` still supported
- **Agent Skills** — reusable task extensions in `.junie/skills/`
- **MCP** — project and user MCP configuration, plus CLI setup with `/mcp`
- **BYOK and local runtimes** — use provider keys or local model runtimes where supported
- **GitHub Action and GitLab CI** — invoke Junie from comments in repository workflows

### Watch For
- Changes in CLI slash commands and flags
- Updates to supported model/provider aliases
- New ACP integrations and IDE-agent interoperability

## 📝 When to Use Junie vs Alternatives

### Use Junie When:
- Working in JetBrains IDEs
- Need multi-file refactoring
- Want to run tests automatically
- Want Plan mode and reviewable diffs
- Using MCP tools

### Consider Claude Code When:
- Deep Anthropic ecosystem integration needed
- Want subagent orchestration
- Working outside JetBrains IDEs
- Prefer Claude-only workflow

### Consider Copilot When:
- Want inline completions
- Need lightweight assistance
- Working in VS Code
- Don't need multi-file edits

### Consider Cursor When:
- Want AI-first editor
- Want Cursor Tab, Composer, rules, or background-agent workflows
- Your team already standardized on Cursor
- You want a live comparison against Junie on the same repository

## 🆘 Getting Help

### Official Resources
- **Documentation**: junie.jetbrains.com/docs/
- **Issue Tracker**: youtrack.jetbrains.com
- **Community Forum**: intellij-support.jetbrains.com

### Community Resources
- **Slack**: JetBrains AI Community
- **Stack Overflow**: Tag `jetbrains-junie`
- **Reddit**: r/jetbrains

### Reporting Issues
When reporting problems, include:
- IDE version and OS
- Junie plugin version
- Model being used
- Steps to reproduce
- Error messages/logs

## ✨ Tips for Success

1. **Understand the boundaries**: Know what Junie can and can't do
2. **Use the right tool**: Don't force Junie when another tool fits better
3. **Manage expectations**: It's an assistant, not a replacement
4. **Stay updated**: Features and capabilities evolve rapidly
5. **Contribute feedback**: Help shape future development

---

**Remember**: Every AI tool has its sweet spot. Junie excels at IDE-integrated, multi-file, safety-first development workflows.
