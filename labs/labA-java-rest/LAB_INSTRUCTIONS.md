# Lab A: Spring Boot REST API with Junie

## Duration: 45-60 minutes

## Learning Objectives
- Use Ask mode to analyze existing code patterns
- Use Code mode to generate new endpoints
- Understand the impact of project guidelines
- Generate comprehensive test suites with AssertJ
- Compare outputs with and without guidelines

## Prerequisites
- IntelliJ IDEA with Junie installed
- Java 17+ installed
- Gradle or Maven configured

## Part 1: Project Setup (5 minutes)

1. Open the `labA-java-rest` project in IntelliJ IDEA
2. Verify the project builds: `./gradlew build`
3. Open Junie panel: View → Tool Windows → Junie
4. Select your preferred model (GPT-5 or Claude Sonnet)

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

### Task 6: Create Project Guidelines

Create `.junie/guidelines.md` with this content:

```markdown
# Spring Boot REST API Guidelines

## Technology Stack
- Java 17
- Spring Boot 3.2
- Testing: JUnit 5 + AssertJ + MockMvc
- Build: Gradle Kotlin DSL

## Architecture Patterns
- Controller → Service → Repository layers
- DTOs for all API requests/responses
- Use Java records for DTOs
- Separate request and response DTOs

## REST Conventions
- Base path: /api/v1
- Resource naming: plural nouns (/users, /products)
- HTTP status codes:
  - 200 OK for successful GET
  - 201 Created for successful POST
  - 404 Not Found for missing resources
  - 400 Bad Request for validation errors

## Code Style
- Constructor injection only (no @Autowired on fields)
- Validation with Jakarta Bean Validation
- Custom exceptions with @ControllerAdvice
- Use @RestController, not @Controller + @ResponseBody

## Testing Standards
- Given-When-Then pattern for test names
- Use @WebMvcTest for controller tests
- Mock service layer with @MockBean
- AssertJ for all assertions
- Test both success and failure cases
- Minimum 80% code coverage

## Example Patterns

### DTO Example:
```java
public record UserRequestDto(
    @NotBlank(message = "Name is required")
    String name,
    
    @Email(message = "Valid email required")
    @NotBlank(message = "Email is required")
    String email
) {}
```

### Test Example:
```java
@Test
void givenValidUser_whenCreateUser_thenReturns201() {
    // Given
    var request = new UserRequestDto("John", "john@example.com");
    
    // When & Then
    mockMvc.perform(post("/api/v1/users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.id").exists());
}
```

## Antipatterns to Avoid
- Business logic in controllers
- Returning entities directly (always use DTOs)
- Field injection with @Autowired
- Using @RequestMapping on methods (use specific @GetMapping, etc.)
- Catching generic Exception
```

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