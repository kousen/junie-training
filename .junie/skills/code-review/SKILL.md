---
name: code-review
description: Review code for correctness, maintainability, security, accessibility, and test coverage.
---

# Code Review

Use this skill when asked to review generated code or compare agent output.

## Review Areas

1. Correctness: behavior matches the request and handles edge cases.
2. Architecture: responsibilities are separated and local conventions are followed.
3. Safety: inputs are validated and secrets are not exposed.
4. Maintainability: names are clear, functions stay focused, and duplication is justified.
5. Tests: happy paths, error paths, and regressions are covered.
6. Accessibility: UI code uses semantic markup, labels, keyboard support, and visible errors.

## Output Format

Group findings by severity:

- Must Fix: bugs, security issues, broken tests, or violated requirements.
- Should Fix: maintainability issues, missing tests, unclear naming, or brittle behavior.
- Consider: optional improvements or tradeoffs.

For each finding, include the file, location if known, issue, and suggested fix.

