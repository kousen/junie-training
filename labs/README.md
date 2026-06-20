# Junie Workshop Labs

Use this page to choose the right exercise during the four-hour workshop.

## Recommended Four-Hour Path

1. Pick **one** primary implementation lab: A, B, or C.
2. Use **Lab D** to demonstrate MCP-assisted planning with current documentation.
3. Use **Mini-Lab F** to create and apply a reusable Junie Skill.
4. Use **Lab E** only if the room is moving quickly.

## Lab Index

Implementation labs A/B/C share the same shape: a **Part 2 "Core Exercise"** (one plan-first
full prompt — this is what you run in class) followed by **Extended Practice** (granular,
self-paced, take-home). Times below are for the in-class core exercise.

| Lab | Focus | Stack | Time | Use When |
|-----|-------|-------|------|----------|
| [Lab A: Spring Boot REST API](labA-java-rest/README.md) | REST endpoint, guidelines, tests | Java 21, Spring Boot, JUnit, AssertJ | ~25 min core | Most attendees are Java/backend developers |
| [Lab B: Python Refactoring](labB-python-refactor/README.md) | Refactoring, type hints, pytest | Python, pytest | ~25 min core | You want a compact refactoring/test exercise |
| [Lab C: React Forms](labC-web-ts-forms/README.md) | Accessible form validation | React, TypeScript, Testing Library | ~25 min core | The group is frontend or TypeScript-heavy |
| [Lab D: context7 MCP Upgrades](labD-context7-upgrade/README.md) | MCP setup, migration planning | React migration, context7 | 20-30 min | You want to show why MCP matters |
| [Lab E: Weather App](labE-web-owm-weather/README.md) | API proxy, states, tests | React, Express, OpenWeatherMap | 20-30 min optional | You have extra time and API-key access |
| [Mini-Lab F: Playwright Skill](labF-playwright-skill/README.md) | Create and use a Junie Skill | Junie Skills, Playwright CLI | 10-15 min | You want to show repeatable agent workflows |

## Teaching Notes

- Run **Part 2 (the Core Exercise)** in class — the single plan-first full prompt. Treat each lab's **Extended Practice** as take-home or as overflow for fast groups.
- Start each implementation lab in Plan mode and review the plan before approving — that critique is the teaching moment.
- Use the optional guidelines contrast to show before/after value, but do not spend the whole class regenerating the same feature.
- Use MCP for external context and live tools; use Skills for repeatable team workflows.
- Run the smallest relevant verification command before accepting generated changes.

