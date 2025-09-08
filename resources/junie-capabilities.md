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
- Full rollback capability
- Preview all changes before applying
- Audit trail of actions taken
- Atomic operations (all or nothing)

**External Tool Integration**
- MCP (Model Context Protocol) support
- Connect to documentation sources (context7)
- Generate browser tests (Playwright)
- Extensible with custom MCP servers

**Model Selection**
- Multiple AI models (GPT-5, Claude Sonnet)
- Model-specific strengths and token limits
- Ability to switch models mid-conversation

## What Junie IS NOT

### ❌ Missing Features (vs other AI tools)

**No Slash Commands**
- Unlike Claude Code, no `/help`, `/clear`, etc.
- All interactions through natural language
- Settings managed through IDE preferences

**No Custom Statusline**
- No persistent status indicator
- Check status in Junie panel only

**No Subagents**
- Cannot spawn specialized agents
- No agent orchestration
- Single conversation thread

**No Voice Input**
- Text-only interaction
- No voice commands or dictation

**No Real-time Collaboration**
- Single-user tool
- No live sharing of Junie sessions
- Guidelines shared via version control only

## 📊 Comparison with Other AI Coding Tools

| Feature | Junie | Claude Code | GitHub Copilot | Cursor |
|---------|-------|-------------|----------------|--------|
| **Multi-file edits** | ✅ | ✅ | ❌ | ✅ |
| **Test execution** | ✅ | ✅ | ❌ | ❌ |
| **Rollback** | ✅ | ✅ | ❌ | Partial |
| **MCP tools** | ✅ | ✅ | ❌ | ❌ |
| **Slash commands** | ❌ | ✅ | ❌ | ✅ |
| **Subagents** | ❌ | ✅ | ❌ | ❌ |
| **IDE native** | ✅ | ❌ | Partial | ❌ |
| **Guidelines** | ✅ | ✅ | ❌ | Partial |

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
- **Token limits**: Model-dependent (GPT-5: higher, Claude: lower)
- **Context window**: Can lose context in very long conversations
- **Execution time**: Complex operations may timeout
- **Network required**: No offline mode

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

## 🔮 Planned Features (Roadmap)

### Q1 2025
- Enhanced token management
- Better context preservation
- Improved error messages
- Extended language support

### Q2 2025
- Junie for GitHub integration
- Team collaboration features
- Custom model fine-tuning
- Advanced MCP marketplace

### Future Considerations
- Voice commands
- Real-time collaboration
- Subagent capabilities
- Offline mode support

## 📝 When to Use Junie vs Alternatives

### Use Junie When:
- Working in JetBrains IDEs
- Need multi-file refactoring
- Want to run tests automatically
- Require rollback capability
- Using MCP tools

### Consider Claude Code When:
- Need slash commands
- Want subagent orchestration
- Working outside IDEs
- Need custom statusline

### Consider Copilot When:
- Want inline completions
- Need lightweight assistance
- Working in VS Code
- Don't need multi-file edits

### Consider Cursor When:
- Want AI-first editor
- Need custom UI
- Prefer standalone tool
- Don't need IDE features

## 🆘 Getting Help

### Official Resources
- **Documentation**: jetbrains.com/help/junie/
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