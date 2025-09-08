# Project Guidelines for Claude

## Project Context

This is a comprehensive Junie training repository for teaching JetBrains' AI coding assistant across multiple IDEs. The training materials were developed with Claude's assistance and demonstrate best practices for AI-assisted development.

## Slide Presentation Best Practices

When creating or editing slides (especially in Slidev format):

### One Idea Per Slide
- Each slide should contain ONE major concept
- Avoid the "bullet-riddled corpse" anti-pattern
- Better to have many simple slides than few dense ones
- 60+ focused slides work better than 30 cramped ones

### Content Guidelines
- Maximum 5-6 bullet points per slide
- Use progressive disclosure across multiple slides
- Keep code examples short and focused (5-10 lines max)
- Leave visual breathing room

### Visual Design for Dark Mode
- Use high contrast colors for text on colored backgrounds
- Test all color combinations for readability
- Prefer lighter text shades (e.g., `#dbeafe` instead of white on blue)
- Add borders to colored boxes for definition
- Keep Mermaid diagrams simple to avoid parsing errors

### Example Structure
```markdown
---
## Single Concept Title

Key point or statement

Supporting detail if needed
---
```

## Lab Instructions Format

When creating lab instructions:

### Structure
1. **Learning Objectives** - Clear, measurable goals
2. **Prerequisites** - Tools and knowledge required
3. **Parts** - Logical progression from simple to complex
4. **Tasks** - Numbered, specific actions
5. **Expected Outcomes** - What success looks like
6. **Common Issues** - Troubleshooting section
7. **Challenge Extensions** - Optional advanced tasks
8. **Reflection Questions** - Reinforce learning

### Writing Style
- Use clear, imperative language for tasks
- Provide example code and expected output
- Include timing estimates for each section
- Add hints for common stumbling blocks

## Project-Specific Patterns

### File Organization
```
/
├── slides.md           # Main presentation
├── slides.pdf         # Exported for distribution
├── slides.pptx        # Editable backup
├── labs/
│   ├── labA-java-rest/
│   │   ├── LAB_INSTRUCTIONS.md
│   │   ├── .junie/guidelines.md
│   │   └── [starter code]
│   └── [other labs...]
├── resources/
│   ├── cheat-sheets/
│   ├── prompts/
│   └── quick-reference.md
└── demo-playwright/
```

### Git Practices
- Comprehensive .gitignore (especially .venv, node_modules)
- Clear commit messages with purpose
- Export slides before committing
- Keep package.json in lab directories, not root

## Junie-Specific Guidelines

### When Teaching Junie
1. Always demonstrate the difference between with and without guidelines
2. Start with Ask mode before Code mode
3. Show Approvals mode before Brave mode
4. Use real-world examples, not contrived ones
5. Emphasize safety and review practices

### MCP Integration
- context7 requires no API key (good for workshops)
- Playwright needs playwright-chromium installed
- Always test MCP connections before demos
- Provide fallback options if MCP fails

## Lessons Learned

### What Worked Well
1. **Progressive Enhancement** - Started simple, added visual polish later
2. **Modular Labs** - Each lab stands alone, participants can choose
3. **Multiple Formats** - Markdown source + PDF + PowerPoint exports
4. **Rich Resources** - Cheat sheets and samples for post-workshop use

### Key Insights
1. **Visual Design Matters** - Enhanced slides significantly improve engagement
2. **One Concept Per Slide** - Cognitive load management is crucial
3. **Hands-On First** - Labs are more valuable than lectures
4. **Guidelines Impact** - Showing before/after demonstrates value clearly

### Technical Discoveries
1. Slidev can export without running server (just needs playwright-chromium)
2. Mermaid diagrams need simple syntax (no quotes, special chars in nodes)
3. Dark backgrounds need careful color selection for contrast
4. Git can handle large PDFs/PPTX files reasonably well

## Future Improvements

Consider adding:
1. Video recordings of key demonstrations
2. Online sandbox environments for labs
3. Automated testing of lab solutions
4. Feedback forms and assessment tools
5. Advanced workshops for specific frameworks

## Success Metrics

A successful training session will:
- Have participants using both Ask and Code modes confidently
- Show clear understanding of when to use each safety level
- Result in participants creating their own guidelines
- Generate interest in MCP tools
- Leave participants with practical, reusable resources

---

**Note**: This document helps Claude (or other AI assistants) understand the project context and maintain consistency when making future updates.