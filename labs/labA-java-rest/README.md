# Lab A: Spring Boot REST API with Junie

## Duration: ~25 minutes for the core exercise; the Extended Practice is self-paced/take-home

## Learning Objectives
- Use Plan mode to align before implementation
- Drive Junie with one complete, well-scoped prompt (the professional pattern)
- Review a plan and a diff critically before accepting
- Understand the impact of project guidelines (`.junie/AGENTS.md`)
- Generate comprehensive test suites with JUnit + AssertJ

## Prerequisites
- IntelliJ IDEA with Junie installed (or Junie CLI)
- Java 21+ installed
- Gradle or Maven configured

## Part 1: Project Setup (5 minutes)

1. Open the `labA-java-rest` project in IntelliJ IDEA
2. Verify the project builds: `./gradlew build`
3. Open Junie: **AI Chat panel → Agent dropdown → Junie** (or `Ctrl/Cmd+Alt+J`)
4. Select your preferred model

> **Alternative — Junie CLI:** Run `junie` in the project directory. Use `Shift+Tab` or `/plan` to start with Plan mode.

## Part 2: The Core Exercise — Plan-First Full Prompt (15-20 minutes)

This is the main lab. It mirrors how a professional drives a coding agent: **one complete,
well-scoped prompt, reviewed before and after** — not a long sequence of tiny instructions.

1. Make sure `.junie/AGENTS.md` exists. If it does not, generate it first — see
   **"Generate project guidelines"** under Extended Practice, then come back here.
2. Start in Plan mode and paste this full prompt:

```
Inspect this Spring Boot project and create a plan first. After I approve the plan, implement a small user-management REST API.

Acceptance criteria:
- GET /api/users returns all users
- GET /api/users/{id} returns one user or a 404 response
- POST /api/users creates a user from validated input
- Use DTOs or records where appropriate
- Add clear error handling
- Add MockMvc tests with AssertJ assertions for success and failure cases
- Run ./gradlew test and fix any failures

Follow .junie/AGENTS.md. Keep the implementation small and explain the changed files, test command, and any tradeoffs.
```

3. **Review the plan before approving.** This is the teaching moment — ask the room what
   they would change about scope, assumptions, or the testing strategy before any code exists.
4. After approval, **review the diff and the test output** before accepting the result.

### Optional: the guidelines contrast (5 minutes)

To show *why* guidelines matter, run a shorter version of the same prompt **before**
creating `.junie/AGENTS.md`, then create the guidelines and re-run. Compare the two
outputs for consistency of structure, naming, DTO style, and test conventions. The full
step-by-step version of this comparison lives in Extended Practice below.

---

## Extended Practice (Take-Home / If Time Allows)

The tasks below break the same workflow into smaller steps. They are ideal for **self-paced
practice after the workshop**, or for filling time if your group moves quickly. You will
**not** complete all of these in a four-hour session — the Core Exercise above is the lab.

### Analyze existing code with Ask Mode

**Task: Understand the current structure.** In Ask mode:
```
Analyze this Spring Boot starter project and explain:
1. The current project structure and dependencies
2. Where REST controllers, services, and DTOs should live
3. What testing approach would be best for the endpoints you'll add
```

Expected insights:
- Minimal Spring Boot app with no controllers yet (empty `web` package)
- spring-boot-starter-web plus the test starter and AssertJ on the classpath
- Standard Gradle layout, ready for you to add the user-management API
- A clean starting point — you generate the controller in the next steps

**Task: Explore testing patterns.** Ask Junie:
```
What testing patterns are commonly used for Spring Boot REST controllers?
Show examples with MockMvc and AssertJ.
```
Review the explanation of `@WebMvcTest` vs `@SpringBootTest`, MockMvc for API testing, and AssertJ fluent assertions.

### Generate code WITHOUT guidelines

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

**Before accepting changes:** review the generated plan, check the Action Allowlist,
examine each diff carefully, and note the style and patterns used.

Then generate tests:
```
Generate comprehensive tests for the UserController using:
- JUnit 5
- MockMvc
- AssertJ assertions
- Test all endpoints and error cases
```

Run and verify:
```bash
./gradlew test
./gradlew bootRun
curl http://localhost:8080/api/users
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com"}'
```

### Generate project guidelines

Ask Junie to analyze the project and generate guidelines. In Ask mode:
```
Analyze this Spring Boot project and generate an AGENTS.md file with guidelines
covering: technology stack, architecture patterns, REST conventions, code style,
and testing standards. Save it to .junie/AGENTS.md
```

> **Note:** The legacy path `.junie/guidelines.md` still works, but `AGENTS.md` is the current standard and is recognized by other AI coding agents too.

It should cover technology stack, architecture patterns, REST conventions, code style,
testing standards, and antipatterns to avoid. **Refine as needed** — for example, you might
specify Given-When-Then test naming, a minimum coverage target, Java records for DTOs, or
constructor injection only (no `@Autowired` on fields).

### Regenerate with guidelines and compare

Delete or rename the UserController and tests, then repeat the same Code-mode request from
"Generate code WITHOUT guidelines." Compare the new output with the previous version — this
is the with/without-guidelines contrast in its detailed form.

### Add a service layer
```
Refactor the UserController to use a proper service layer:
- Create UserService interface and implementation
- Move business logic to service
- Add repository layer (can be mocked)
- Maintain test coverage
```

### Add global exception handling
```
Add global exception handling:
- Create custom UserNotFoundException
- Add @ControllerAdvice for global handling
- Return proper error responses with details
- Add tests for error scenarios
```

### Add integration tests
```
Create integration tests using @SpringBootTest:
- Test the full request/response cycle
- Use TestRestTemplate
- Test with real beans (not mocks)
- Include database setup/teardown if needed
```

### Experiment with Brave Mode
1. Enable Brave Mode in Junie settings (or `Ctrl+B` in the CLI)
2. Make a simple request:
```
Add a PATCH endpoint to update user email only.
Include validation and tests.
```
3. Notice how Junie proceeds with fewer interruptions — then review all changes after completion.

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

✓ One complete, plan-first prompt beats a long sequence of tiny instructions
✓ Review the plan and the diff — that's where your judgment adds value
✓ Guidelines ensure consistent code generation
✓ Build trust gradually before using Brave Mode
✓ Junie can handle complex, multi-file changes
