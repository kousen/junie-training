---
name: add-tests
description: Analyze existing code and add focused tests for behavior, edge cases, validation, and regressions.
---

# Add Tests

Use this skill when the request asks for missing tests, stronger coverage, or a regression test.

## Workflow

1. Inspect the implementation and any existing tests before writing new tests.
2. Identify public behavior, branching logic, boundary conditions, and error paths.
3. Prefer small tests named by behavior.
4. Use parametrized tests when multiple inputs share the same expected behavior.
5. Avoid snapshot tests unless the project already uses them and the output is stable.
6. Run the relevant test command and summarize failures or coverage gaps.

## Coverage Checklist

- Happy path behavior
- Invalid input and validation errors
- Empty, null, zero, and boundary values
- Exceptions and error responses
- Integration points between controller/service/client layers

