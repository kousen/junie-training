# MIGRATION

This document records non-trivial design decisions and changes made while creating the REST API project.

## 2025-11-10: Initial REST API scaffolding
- Java version: 21 (Gradle toolchain configured).
- Spring Boot: 3.5.x, Gradle Kotlin DSL.
- Package structure established:
  - Controllers: `com.example.web`
  - Services: `com.example.service`
  - Repository: `com.example.repository`
  - DTOs: `com.example.dto`
  - Global exception handling: `com.example.config`
- Chosen base path: `/api/*` (e.g., `/api/users`).
- DTOs implemented as Java records with compact constructor normalization:
  - `CreateUserRequest(name, email)` trims and lowercases email; Jakarta validation used (`@NotBlank`, `@Email`).
  - `UserResponse(id, name, email)`.
  - `ErrorResponse(message, code, details)` for consistent error payloads.
- In-memory repository created (`UserRepository`) using `ConcurrentHashMap` and `AtomicLong` for ids. Marked as `@Repository` so it is a Spring bean.
- Service layer:
  - `UserService` interface and `DefaultUserService` implementation (`@Service`).
  - Business rule: email must be unique; throws `IllegalArgumentException` when violated.
  - `UserNotFoundException` added for 404 scenarios.
- Controller:
  - `UserController` under `/api/users`.
  - Endpoints: `GET /api/users`, `GET /api/users/{id}`, `POST /api/users` (returns 201 + Location header).
- Global exception handling:
  - `@RestControllerAdvice` converts `UserNotFoundException` → 404 (`USER_NOT_FOUND`).
  - Validation errors → 400 (`VALIDATION_ERROR`) with field-level messages.
  - IllegalArgumentException → 400 (`BAD_REQUEST`).
- Tests:
  - `@WebMvcTest(UserController)` with MockMvc + AssertJ.
  - Positive and negative cases implemented (including 400/404 paths).

## Future considerations
- Replace in-memory repository with persistence if needed.
- Add pagination and search to `/api/users`.
- Consider versioned base path (`/api/v1`) if required; current guideline is `/api/*`.
- Add CI workflow and optional OpenAPI documentation.


## 2025-11-10: Migrate in-memory store to H2 with Spring Data JPA
- Added dependencies in `build.gradle.kts`:
  - `spring-boot-starter-data-jpa`
  - `com.h2database:h2` (runtime)
- Introduced JPA entity `com.example.repository.UserEntity` mapped to table `users` with unique constraint on `email`.
- Replaced custom in-memory `UserRepository` with Spring Data JPA interface:
  - `UserRepository extends JpaRepository<UserEntity, Long>`
  - Added query method `findByEmailIgnoreCase(String email)` to preserve case-insensitive uniqueness behavior.
- Refactored `DefaultUserService` to use the JPA repository and map entity <-> DTO.
- Configured H2 in `src/main/resources/application.properties`:
  - In-memory URL `jdbc:h2:mem:labadb` with `ddl-auto=update`, SQL logging enabled, and H2 console.
- Behavior preserved:
  - Email uniqueness validated before save → throws `IllegalArgumentException` which maps to 400 with `BAD_REQUEST`.
  - `UserNotFoundException` continues to map to 404 with `USER_NOT_FOUND` via `GlobalExceptionHandler`.
- Tests:
  - Existing `@WebMvcTest` controller tests continue to pass with service mocked.
  - Context smoke test (`HelloControllerTest`) passes with new configuration.
- Branch: work performed on `feature/jpa-h2-migration`.
