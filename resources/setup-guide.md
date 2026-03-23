# Junie Workshop Setup Guide

Complete this setup **before** the workshop to hit the ground running.

## 1. JetBrains IDE (Required)

You need **one or more** of the following IDEs (2025.1+ recommended):

| Lab | IDE | Language |
|-----|-----|----------|
| Lab A | IntelliJ IDEA | Java 17+ |
| Lab B | PyCharm | Python 3.8+ |
| Lab C | WebStorm | TypeScript / React |
| Lab D | Any of the above | MCP tools |

**Install/Update:** [jetbrains.com/ides](https://www.jetbrains.com/ides/)

### Enable Junie in the IDE

1. Open your JetBrains IDE
2. Open **AI Chat** panel (View > Tool Windows > AI Chat, or `Ctrl+Alt+J` / `Cmd+Alt+J`)
3. Click the **Agent dropdown** at the top of the chat panel
4. Select **Junie**
5. If Junie is not listed, go to **Settings > Plugins**, search for "Junie", and install it

### JetBrains AI Subscription

Junie requires a JetBrains AI subscription **or** your own API keys (BYOK).

| Tier | Cost | AI Credits / 30 days |
|------|------|---------------------|
| **AI Free** | Free | 3 credits |
| **AI Pro** | $10/month | 10 credits |
| **AI Ultimate** | $30/month | 35 credits |
| **BYOK** | Your provider costs | Unlimited (your own keys) |

1 AI Credit = $1 USD of LLM usage.

**Sign up or manage:** [jetbrains.com/ai](https://www.jetbrains.com/ai/)

**BYOK setup:** Settings > Tools > AI Assistant > AI Providers > Add your OpenAI, Anthropic, Google, or xAI API key.

### Verify IDE Setup

- [ ] JetBrains IDE opens and runs
- [ ] Junie appears in the AI Chat agent dropdown
- [ ] You can send a message like "Hello, what can you do?" and get a response

---

## 2. Junie CLI (Optional but Recommended)

The CLI lets you use Junie from the terminal, outside the IDE.

### macOS (Homebrew)

```bash
brew tap jetbrains/junie
brew update
brew install junie
```

### macOS / Linux (Script)

```bash
curl -fsSL https://junie.jetbrains.com/install.sh | bash
```

### Authentication

On first run, Junie CLI will prompt you to authenticate. You have three options:

1. **JetBrains account** (browser login)
2. **API key**: Set `JUNIE_API_KEY` environment variable
3. **BYOK**: Use your own provider keys directly

### Verify CLI Setup

```bash
# Check installation
junie --version

# Start Junie in any project directory
cd your-project
junie
```

- [ ] `junie --version` prints a version number
- [ ] `junie` starts an interactive session

---

## 3. JetBrains Air (Optional Preview)

Air is JetBrains' new agentic development environment. It's in **public preview** (macOS only as of March 2026).

**Download:** [jetbrains.com/air](https://www.jetbrains.com/air/)

We will demo Air briefly during the workshop but it is **not required** for any labs.

- [ ] (Optional) Air is installed and opens

---

## 4. MCP Tools (For Lab D and Playwright Demo)

MCP (Model Context Protocol) tools extend Junie with external capabilities. We'll configure these together during the workshop, but you can set them up ahead of time.

### In the IDE

1. Go to **Settings > Junie > MCP**
2. Click **Edit mcp.json**
3. Add the following configuration:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp-server"]
    }
  }
}
```

### Prerequisites for MCP

- **Node.js 18+** is required for `npx` to work
- **Playwright** (for the demo): `npx playwright install chromium`

### Verify MCP Setup

- [ ] Node.js 18+ is installed (`node --version`)
- [ ] MCP configuration is saved in the IDE

---

## 5. Lab Source Code

Clone the training repository:

```bash
git clone https://github.com/kousen/junie-training.git
cd junie-training
```

Each lab is in its own directory under `labs/` with a `LAB_INSTRUCTIONS.md` file.

### Language-Specific Setup

**Java (Lab A):**
- Java 17+ JDK installed
- IntelliJ should detect the Gradle/Maven project automatically

**Python (Lab B):**
- Python 3.8+ installed
- PyCharm should detect the project and offer to create a virtual environment

**React/TypeScript (Lab C):**
```bash
cd labs/labC-web-ts-forms
npm install
```

- [ ] Repository cloned
- [ ] Language runtimes installed for your chosen labs

---

## Setup Checklist Summary

| Item | Required? | Status |
|------|-----------|--------|
| JetBrains IDE (2025.1+) | Yes | [ ] |
| Junie enabled in AI Chat | Yes | [ ] |
| JetBrains AI subscription or BYOK | Yes | [ ] |
| Junie CLI | Recommended | [ ] |
| JetBrains Air | Optional | [ ] |
| Node.js 18+ (for MCP) | For Labs D/Demo | [ ] |
| Java 17+ | For Lab A | [ ] |
| Python 3.8+ | For Lab B | [ ] |
| Training repo cloned | Yes | [ ] |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Junie not in agent dropdown | Update IDE to 2025.1+, install Junie plugin from Settings > Plugins |
| "No AI subscription" error | Check JetBrains account at [account.jetbrains.com](https://account.jetbrains.com) |
| CLI `command not found` | Restart your terminal, or check `~/.local/bin` is in your PATH |
| MCP tools not loading | Verify Node.js 18+ with `node --version`, check mcp.json syntax |
| Slow or no response | Check your AI Credits balance, or switch to BYOK |

---

**Questions?** Reach out to the instructor before the workshop so we can troubleshoot together.
