## v0.1.0 – Add User API

- Added `UserController` under `/api/users` in `com.example.web`.
- Introduced DTO records (`UserDto`, `CreateUserRequest`) with compact constructors for normalization (trim, lowercase email) and jakarta.validation constraints.
- Implemented `UserService` interface and `DefaultUserService` in `com.example.service` as the business/service layer.
- Introduced `UserRepository` abstraction and moved in-memory persistence to `InMemoryUserRepository` to reflect repository responsibilities (was previously `InMemoryUserService`).
- Centralized error handling with `@RestControllerAdvice` and RFC‑7807 `ProblemDetail` responses (`GlobalExceptionHandler`).
  - Added handler for `ConstraintViolationException` to return HTTP 400 for method-level validation failures (e.g., non-positive path variables).
- Added domain `NotFoundException` for 404 cases.
- Created MockMvc tests (`UserControllerTest`) using JUnit 5 and AssertJ, covering success and 4xx scenarios (400 validation errors, 404 not found, 400 for non-positive id).
- Gradle: added dependency `org.springframework.boot:spring-boot-starter-validation` to enable Bean Validation.
- Tests: migrated from deprecated `@MockBean` to `@MockitoBean` (import: `org.springframework.test.context.bean.override.mockito.MockitoBean`) provided by Spring Boot's test context; removed invalid dependency on `spring-boot-test-mockito` and rely on `spring-boot-starter-test`.

Rationale: the previous `InMemoryUserService` mixed persistence with orchestration. Splitting it into a repository and a service aligns with layered architecture: controllers -> services (business rules) -> repositories (data access).
