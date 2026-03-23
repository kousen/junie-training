---
name: code-review
description: Review code for correctness, style, security, and test coverage, then suggest improvements
---

# Code Review

When asked to review code, perform a structured review covering these areas.

## Review Checklist

### 1. Correctness
- Does the code do what it claims to do?
- Are edge cases handled (null, empty, boundary values)?
- Are error paths reachable and tested?

### 2. Architecture
- Is responsibility properly separated (controller → service → repository)?
- Are DTOs used instead of exposing internal models?
- Is dependency injection constructor-based?
- Is there any business logic leaking into controllers?

### 3. Security
- Is user input validated before use?
- Are there injection risks (SQL, command, XSS)?
- Are error messages safe (no stack traces or internal details exposed)?
- Are sensitive fields excluded from responses?

### 4. Style & Conventions
- Do names reveal intent?
- Are methods small and focused?
- Does the code follow project conventions from guidelines?

### 5. Test Coverage
- Are both happy-path and error-path scenarios tested?
- Are validation rules tested with invalid input?
- Do tests use AssertJ assertions?
- Are tests independent (no shared mutable state)?

## Output Format

Present findings grouped by severity:

**Must Fix** — Bugs, security issues, or violations of project guidelines
**Should Fix** — Code quality issues, missing tests, unclear naming
**Consider** — Style suggestions, potential improvements, alternative approaches

For each finding, include:
1. The file and location
2. What the issue is
3. A suggested fix or approach
