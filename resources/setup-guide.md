# Junie Workshop Setup Guide

Complete this setup **before** the workshop to hit the ground running.

## 1. JetBrains IDE (Required)

You need **one or more** of the following IDEs. Use the latest stable version you can; 2026.1+ is recommended if you want the CLI to connect back to the IDE for richer project context.

| Lab | IDE | Language |
|-----|-----|----------|
| Lab A | IntelliJ IDEA | Java 21+ |
| Lab B | PyCharm | Python 3.8+ |
| Lab C | WebStorm | TypeScript / React |
| Lab D | Any of the above | MCP tools |
| Mini-Lab F | Any of the above | Agent Skills + Playwright CLI |

**Install/Update:** [jetbrains.com/ides](https://www.jetbrains.com/ides/)

### Enable Junie in the IDE

1. Open your JetBrains IDE
2. Open **AI Chat** panel (View > Tool Windows > AI Chat, or `Ctrl+Alt+J` / `Cmd+Alt+J`)
3. Click the **Agent dropdown** at the top of the chat panel
4. Select **Junie**
5. If Junie is not listed, go to **Settings > Plugins**, search for "Junie", and install it

### JetBrains AI Subscription

Junie requires a JetBrains AI subscription, a Junie API key, **or** your own API keys (BYOK).

| Tier | Cost | AI Credits / 30 days |
|------|------|---------------------|
| **AI Free** | Free | 3 credits |
| **AI Pro** | $10/month | 10 credits |
| **AI Ultimate** | $30/month | 35 credits |
| **BYOK** | Your provider costs | Your provider quota |

1 AI Credit = $1 USD of LLM usage.

**Sign up or manage:** [jetbrains.com/ai](https://www.jetbrains.com/ai/)

**BYOK setup:** Settings > Tools > AI Assistant > AI Providers. Add your OpenAI, Anthropic, Google, xAI, OpenRouter, GitHub Copilot, or local runtime configuration where supported.

### Verify IDE Setup

- [ ] JetBrains IDE opens and runs
- [ ] Junie appears in the AI Chat agent dropdown
- [ ] You can send a message like "Hello, what can you do?" and get a response

---

## 2. Junie CLI (Recommended)

The CLI lets you use Junie from the terminal, outside the IDE.

### macOS (Homebrew)

```bash
brew tap jetbrains-junie/junie
brew update
brew install junie
```

### macOS / Linux (Script)

```bash
curl -fsSL https://junie.jetbrains.com/install.sh | bash
```

### npm

```bash
npm install -g @jetbrains/junie-cli
```

### Authentication

On first run, Junie CLI may prompt you to authenticate and choose a model. The model list can include provider models and local runtimes such as Ollama; it does not necessarily show a JetBrains-branded model.

You have three authentication options:

1. **JetBrains account** (browser login)
2. **API key**: Set `JUNIE_API_KEY` environment variable
3. **BYOK**: Use supported provider keys directly, such as `--openai-api-key`, `--anthropic-api-key`, `--google-api-key`, `--grok-api-key`, or `--openrouter-api-key`

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
- [ ] `junie --help` shows non-interactive usage such as `junie "Fix the bug"` and `junie --review`

### Optional: Verify Remote Mode

Remote mode lets you continue the same running CLI session from a browser, including a phone browser.

1. Start `junie` in a project directory.
2. Run `/remote`.
3. Open `junie.jetbrains.com/remote` in your browser.
4. Run `/remote` again in the terminal to stop the remote session.

Remote mode uses the Junie service. JetBrains Account sign-in is the simplest path; a `JUNIE_API_KEY` is the alternate route. BYOK-only setups may need additional Junie authentication.

---

## 3. Optional Comparison Tools

The workshop focuses on Junie. The instructor may briefly compare the same task in other coding agents when that helps explain tool fit.

- **Cursor**: Useful comparison for AI-first editor workflows and Cursor rules
- **Codex**: Useful comparison for terminal/app/GitHub workflows
- **Claude Desktop or Claude Code**: Useful comparison for Anthropic-centered workflows
- **Antigravity**: Useful comparison for browser-oriented or multi-surface workflows

Participants do **not** need to install these tools for the Junie workshop.

---

## 4. MCP Tools (For Lab D and Browser Exploration)

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
      "args": ["-y", "@playwright/mcp"]
    }
  }
}
```

### Prerequisites for MCP

- **Node.js 18+** is required for `npx` to work
- **Playwright** (for the demo): `npx playwright install chromium`

### In the CLI

Run `junie` in the project directory and use `/mcp` to open the MCP setup assistant. Project MCP configuration lives in `.junie/mcp/mcp.json`; user-level configuration lives in `~/.junie/mcp/mcp.json`.

### Playwright Note

For repeatable Playwright test generation, the workshop demonstrates a Skill plus local Playwright CLI. Playwright MCP remains useful for interactive browser exploration.

### Verify MCP Setup

- [ ] Node.js 18+ is installed (`node --version`)
- [ ] MCP configuration is saved in the IDE
- [ ] Optional: `/mcp` in Junie CLI can see the project MCP configuration

---

## 5. Lab Source Code

Clone the training repository:

```bash
git clone https://github.com/kousen/junie-training.git
cd junie-training
```

Each lab is in its own directory under `labs/` with a `README.md` that renders automatically on GitHub.

### Language-Specific Setup

**Java (Lab A):**
- Java 21+ JDK installed
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

## 6. Credit Conservation (Read This)

Junie usage draws on AI Credits (1 Credit = $1 USD of LLM usage) unless you use BYOK or a
local runtime. To make a subscription last through a 4-hour workshop:

- **Prefer one complete prompt** over many small ones — every lab ships a plan-first full
  prompt for exactly this reason. Re-running the same feature repeatedly burns credits fast.
- **Use Ask/Plan mode for exploration.** Reading and planning is cheaper than generating
  and regenerating code.
- **Pick the model intentionally** with `/model`. The picker shows each model's input/output
  price per million tokens and flags ones that consume several times the default's credits —
  the JetBrains AI default is an intentionally low-cost model, so reserve premium models for
  the hardest tasks.
- **Lower the effort with `/effort`** for routine work. Effort trades reasoning depth for
  cost and speed; high effort is worth it only on genuinely hard tasks.
- **Check `/usage`** periodically — it shows your license, remaining AI Credits, and session
  token usage.
- **For heavy practice, use BYOK or a local runtime** (Ollama / LM Studio / LiteLLM) so the
  practice does not consume JetBrains credits.
- **Code completion / Next Edit suggestions are free** and do not draw from your quota.

---

## 7. Live-Demo Fallback Plan

The two demos most likely to fail live depend on the network *and* the Junie service:

| Demo | Failure risk | Fallback |
|------|--------------|----------|
| CI/CD `@junie-agent` on a PR | Action queue, secrets, network | Have a **pre-recorded screen capture** ready; show a completed PR from a previous run |
| Remote mode (`/remote` + phone) | Tunnel/service, machine sleep | Pre-recorded clip; or show the browser UI on the same laptop |
| MCP (context7) | `npx` download, network | Pre-run `npx -y @upstash/context7-mcp` once before class to warm the cache; have a screenshot of a successful tool call |
| Credits exhausted mid-class | Quota | Switch to **BYOK** or a **local model** via `/model`; keep a backup provider key handy |

General safety net: keep a clean clone of this repo with the labs already at a known-good
state so you can reset quickly if a live edit goes sideways.

---

## Setup Checklist Summary

| Item | Required? | Status |
|------|-----------|--------|
| Current JetBrains IDE | Yes | [ ] |
| Junie enabled in AI Chat | Yes | [ ] |
| JetBrains AI subscription or BYOK | Yes | [ ] |
| Junie CLI | Recommended | [ ] |
| Cursor/Codex/Claude/Antigravity | Instructor comparison only | [ ] |
| Node.js 18+ (for MCP) | For Labs D/Demo | [ ] |
| Playwright browsers | For Mini-Lab F | [ ] |
| Java 21+ | For Lab A | [ ] |
| Python 3.8+ | For Lab B | [ ] |
| Training repo cloned | Yes | [ ] |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Junie not in agent dropdown | Update the IDE, install Junie from Settings > Plugins, or use the standalone Junie tool window |
| "No AI subscription" error | Check JetBrains account at [account.jetbrains.com](https://account.jetbrains.com) |
| CLI `command not found` | Restart your terminal, or check `~/.local/bin` is in your PATH |
| MCP tools not loading | Verify Node.js 18+ with `node --version`, check mcp.json syntax |
| Slow or no response | Check your AI Credits balance, use `/usage`, switch models, or use BYOK |

---

**Questions?** Reach out to the instructor before the workshop so we can troubleshoot together.
