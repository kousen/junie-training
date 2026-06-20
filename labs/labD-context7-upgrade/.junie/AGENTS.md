# Guidelines (MCP Migration Lab)

- Use Plan mode before changing dependencies.
- Use context7 for current library guidance, then verify against local project files.
- Prefer one contained migration slice over broad dependency churn.
- Document assumptions, breaking changes, verification commands, and rollback steps.
- Do not commit secrets or API tokens into MCP configuration.
- Run the smallest relevant test or build command after each implementation slice.

