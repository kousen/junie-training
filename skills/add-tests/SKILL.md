---
name: add-tests
description: Analyze existing code and generate comprehensive tests with edge cases, using the project's testing framework and conventions
---

# Add Tests

When asked to add or improve tests for existing code, follow this workflow.

## Step 1 — Analyze the Code Under Test

Before writing any tests:
- Read the implementation thoroughly
- Identify all public methods and their contracts
- Map out branching logic (if/else, switch, exception paths)
- Note validation rules, boundary conditions, and error cases
- Check what tests already exist to avoid duplication

## Step 2 — Plan Test Cases

Organize tests into categories:

### Happy Path
- Each public method works correctly with valid input
- Return values and status codes are correct
- State changes happen as expected

### Validation & Bad Input
- Required fields missing or blank
- Fields exceeding size limits
- Invalid formats (bad email, negative numbers, etc.)
- Null and empty inputs where applicable

### Error & Edge Cases
- Resource not found (404 scenarios)
- Duplicate creation attempts
- Boundary values (min, max, zero, empty collections)
- Concurrent access if relevant

### Integration Points
- Does the controller correctly delegate to the service?
- Does the service correctly throw expected exceptions?
- Are exception handlers mapping to the right HTTP status codes?

## Step 3 — Write Tests

Follow these conventions:
- **Framework**: JUnit 5 + AssertJ (`assertThat` only, never `assertEquals`)
- **Controller tests**: Use `@WebMvcTest` with MockMvc
- **Service tests**: Plain unit tests, no Spring context needed
- **Mocking**: Use `@MockitoBean` (not deprecated `@MockBean`)
- **Naming**: Descriptive method names or Given-When-Then pattern
- **Structure**: Arrange-Act-Assert within each test
- **Independence**: No shared mutable state between tests

## Step 4 — Verify Coverage

After writing tests:
- Confirm every public method has at least one test
- Confirm every validation rule has a negative test
- Confirm every custom exception has a test that triggers it
- Run the tests and report results
