# MCP (Model Context Protocol) Cheat Sheet

## What is MCP?
Model Context Protocol allows Junie to connect to external tools and services, extending its capabilities beyond the IDE.

## Available MCP Tools

### 📚 context7
Real-time library documentation and version information.

**Setup**:
```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["@upstash/context7"]
    }
  }
}
```

**Use Cases**:
- Get latest stable versions
- Find migration guides
- Check breaking changes
- View API documentation
- Compare version compatibility

**Example Prompts**:
```
"Use context7 to find the latest stable React version"
"Get the Spring Boot 3 migration guide from version 2"
"Check breaking changes between Angular 14 and 16"
"Find the recommended Jest version for React 18"
```

### 🎭 Playwright
Browser automation and E2E test generation.

**Setup**:
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp-server"]
    }
  }
}
```

**Use Cases**:
- Generate E2E tests
- Create page objects
- Add accessibility tests
- Browser automation scripts
- Visual regression tests

**Example Prompts**:
```
"Use Playwright to generate login flow tests"
"Create page object models for all forms"
"Generate accessibility tests for the dashboard"
"Add visual regression tests for the homepage"
```

### 🔍 Firecrawl (Optional)
Web scraping and search capabilities.

**Setup**:
```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["@firecrawl/mcp-server"],
      "env": {
        "FIRECRAWL_API_KEY": "your-key-here"
      }
    }
  }
}
```

**Use Cases**:
- Search documentation
- Scrape API references
- Find code examples
- Research best practices

## Configuration Steps

### 1. Open MCP Settings
- Go to Settings/Preferences
- Navigate to Junie → MCP
- Click "Add" or "Edit"

### 2. Edit mcp.json
Add your desired MCP servers to the configuration file.

### 3. Test Connection
- Restart Junie
- Check connection status in Junie panel
- Test with a simple command

## Multiple MCP Servers

You can run multiple MCP servers simultaneously:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["@upstash/context7"]
    },
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp-server"]
    },
    "custom-tool": {
      "command": "node",
      "args": ["./path/to/custom-mcp-server.js"]
    }
  }
}
```

## Troubleshooting

### Connection Issues
- **Check npm/npx**: Ensure Node.js is installed
- **Restart IDE**: After configuration changes
- **Check logs**: View → Tool Windows → Junie Logs
- **Verify JSON**: Ensure valid JSON syntax

### Common Errors

**"MCP server not found"**
- Install the MCP package: `npm install -g @tool/mcp-server`

**"Connection timeout"**
- Check firewall settings
- Verify network connectivity
- Try increasing timeout in settings

**"Invalid API key"**
- Check environment variables
- Verify key in mcp.json
- Ensure key has proper permissions

## Best Practices

### 1. Version Checking
Always use context7 before major upgrades:
```
"Use context7 to check compatibility before upgrading from React 17 to 18"
```

### 2. Test Generation
Combine Playwright with guidelines:
```
"Use Playwright to generate tests following our testing guidelines"
```

### 3. Documentation
Use MCP tools to stay current:
```
"Use context7 to get the latest best practices for [technology]"
```

### 4. Incremental Updates
Check each dependency separately:
```
"Use context7 to analyze each dependency for breaking changes"
```

## Advanced Usage

### Custom MCP Servers
You can create your own MCP servers:

```javascript
// custom-mcp-server.js
const { MCPServer } = require('@mcp/server');

const server = new MCPServer({
  name: 'custom-tool',
  version: '1.0.0',
  tools: {
    customFunction: async (params) => {
      // Your custom logic here
      return { result: 'success' };
    }
  }
});

server.start();
```

### Environment Variables
Pass sensitive data via environment variables:

```json
{
  "mcpServers": {
    "api-tool": {
      "command": "node",
      "args": ["./api-mcp-server.js"],
      "env": {
        "API_KEY": "${API_KEY}",
        "API_URL": "${API_URL}"
      }
    }
  }
}
```

## Quick Command Reference

| Tool | Command | Purpose |
|------|---------|---------|
| context7 | `"Use context7 to..."` | Library documentation |
| playwright | `"Use Playwright to..."` | E2E test generation |
| firecrawl | `"Use Firecrawl to..."` | Web scraping |
| custom | `"Use [tool] to..."` | Custom functionality |

## Tips

1. **Chain MCP calls**: Use context7 first, then generate code
2. **Combine with guidelines**: MCP tools respect your guidelines
3. **Cache results**: MCP responses are cached for efficiency
4. **Monitor usage**: Some tools have API limits
5. **Test locally**: Verify MCP tools work before team rollout

---

**Note**: MCP tools are constantly evolving. Check the official documentation for the latest features and capabilities.