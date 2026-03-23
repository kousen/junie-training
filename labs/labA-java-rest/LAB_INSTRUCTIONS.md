# Lab A: Spring Boot REST API with Junie

## Duration: 45-60 minutes

## Learning Objectives
- Use Ask mode to analyze existing code patterns
- Use Code mode to generate new endpoints
- Understand the impact of project guidelines
- Generate comprehensive test suites with AssertJ
- Compare outputs with and without guidelines

## Prerequisites
- IntelliJ IDEA with Junie installed (or Junie CLI)
- Java 17+ installed
- Gradle or Maven configured

## Part 1: Project Setup (5 minutes)

1. Open the `labA-java-rest` project in IntelliJ IDEA
2. Verify the project builds: `./gradlew build`
3. Open Junie: **AI Chat panel → Agent dropdown → Junie** (or `Ctrl/Cmd+Alt+J`)
4. Select your preferred model (e.g., Sonnet 4.5, GPT 5, Gemini 3 Pro)

> **Alternative — Junie CLI:** Run `junie` in the project directory. Use `Shift+Tab` to toggle Plan mode (read-only analysis).

## Part 2: Analyze Existing Code with Ask Mode (10 minutes)

### Task 1: Understanding the Current Structure

In Junie's Ask mode, type:
```
Analyze the HelloController class and explain:
1. The current endpoint structure
2. What improvements could be made
3. What testing approach would be best
```

Expected insights:
- Simple controller with basic GET endpoint
- No service layer separation
- No DTOs or validation
- Missing comprehensive tests

### Task 2: Explore Testing Patterns

Ask Junie:
```
What testing patterns are commonly used for Spring Boot REST controllers?
Show examples with MockMvc and AssertJ.
```

Review Junie's explanation of:
- @WebMvcTest vs @SpringBootTest
- MockMvc for API testing
- AssertJ fluent assertions

## Part 3: Generate Code WITHOUT Guidelines (15 minutes)

### Task 3: Create User Endpoint

Switch to Code mode and request:
```
Create a new REST endpoint for user management:
- GET /api/users - list all users
- GET /api/users/{id} - get user by id
- POST /api/users - create new user
- Use appropriate DTOs
- Add basic validation
- Include error handling
```

**Before accepting changes:**
1. Review the generated plan
2. Check the Action Allowlist
3. Examine each diff carefully
4. Note the style and patterns used

### Task 4: Generate Tests

Still in Code mode:
```
Generate comprehensive tests for the UserController using:
- JUnit 5
- MockMvc
- AssertJ assertions
- Test all endpoints and error cases
```

Review and apply the generated tests.

### Task 5: Run and Verify

1. Run the tests: `./gradlew test`
2. Start the application: `./gradlew bootRun`
3. Test manually with curl or Postman:
```bash
curl http://localhost:8080/api/users
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com"}'
```

## Part 4: Create and Apply Guidelines (10 minutes)

### Task 6: Generate Project Guidelines

Ask Junie to analyze the project and generate guidelines. In Ask mode:
```
Analyze this Spring Boot project and generate an AGENTS.md file with guidelines
covering: technology stack, architecture patterns, REST conventions, code style,
and testing standards. Save it to .junie/AGENTS.md
```

> **Note:** The legacy path `.junie/guidelines.md` still works, but `AGENTS.md` is the current standard and is recognized by other AI coding agents too.

Review what Junie generates. It should cover areas like:
- Technology stack (Java version, Spring Boot, testing frameworks)
- Architecture patterns (layered architecture, DTOs, records)
- REST conventions (base path, resource naming, status codes)
- Code style (constructor injection, validation, exception handling)
- Testing standards (naming patterns, test types, coverage)
- Antipatterns to avoid

**Refine as needed.** If Junie missed something important or made a choice you disagree with, edit the file or ask Junie to update it. For example, you might want to specify:
- Given-When-Then test naming pattern
- Minimum 80% code coverage
- Java records for DTOs
- Constructor injection only (no `@Autowired` on fields)

### Task 7: Regenerate with Guidelines

1. Delete or rename the UserController and tests
2. In Code mode, repeat the same request:
```
Create a new REST endpoint for user management:
- GET /api/users - list all users
- GET /api/users/{id} - get user by id
- POST /api/users - create new user
- Use appropriate DTOs
- Add basic validation
- Include error handling
```

3. Compare the new output with the previous version

## Part 5: Advanced Features (15 minutes)

### Task 8: Add Service Layer

In Code mode:
```
Refactor the UserController to use a proper service layer:
- Create UserService interface and implementation
- Move business logic to service
- Add repository layer (can be mocked)
- Maintain test coverage
```

### Task 9: Add Exception Handling

```
Add global exception handling:
- Create custom UserNotFoundException
- Add @ControllerAdvice for global handling
- Return proper error responses with details
- Add tests for error scenarios
```

### Task 10: Add Integration Tests

```
Create integration tests using @SpringBootTest:
- Test the full request/response cycle
- Use TestRestTemplate
- Test with real beans (not mocks)
- Include database setup/teardown if needed
```

## Part 6: Experiment with Brave Mode (5 minutes)

### Task 11: Try Brave Mode

1. Enable Brave Mode in Junie settings
2. Make a simple request:
```
Add a PATCH endpoint to update user email only.
Include validation and tests.
```

3. Notice how Junie proceeds with fewer interruptions
4. Review all changes after completion

## Reflection Questions

1. What differences did you notice between outputs with and without guidelines?
2. Which patterns from the guidelines were most helpful?
3. When would you use Brave Mode vs Approvals Mode?
4. How could guidelines help your team maintain consistency?

## Common Issues and Solutions

**Issue**: Junie generates incompatible Spring Boot versions
**Solution**: Specify version in guidelines

**Issue**: Tests fail due to missing dependencies
**Solution**: Ask Junie to "check and add required test dependencies to build.gradle"

**Issue**: Different assertion styles in tests
**Solution**: Specify AssertJ exclusively in guidelines

## Challenge Extensions

1. Add pagination to the GET /api/users endpoint
2. Implement user search with query parameters
3. Add API documentation with SpringDoc OpenAPI
4. Create a GitHub Action to run tests

## Key Takeaways

✓ Ask mode helps understand before implementing
✓ Guidelines ensure consistent code generation
✓ Review diffs carefully before accepting
✓ Build trust gradually before using Brave Mode
✓ Junie can handle complex, multi-file changes