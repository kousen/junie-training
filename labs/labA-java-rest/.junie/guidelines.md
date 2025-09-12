# Spring Boot REST API Guidelines

## Technology and Versions
- Java: 21 (Gradle toolchain)
- Spring Boot: 3.5.x
- Web: spring-boot-starter-web
- Validation: spring-boot-starter-validation (jakarta.validation)
- Testing: spring-boot-starter-test, JUnit 5, AssertJ
- Mocking: @MockitoBean from org.springframework.test.context.bean.override.mockito.MockitoBean (replacement for deprecated @MockBean)
- Optional (future): spring-boot-starter-data-jpa, H2 (dev/test), springdoc-openapi-starter-webmvc-ui, spring-boot-starter-actuator

## Architecture & Package Layout
- Application root: com.example
- Controllers: com.example.web
- DTOs (API models): com.example.web.dto
- Error handling: com.example.web.error
- Services (business rules): com.example.service
- Repositories (data access): com.example.service for in-memory; or com.example.repository if JPA is added

Rules:
- Controllers depend on services; services depend on repositories; controllers must not depend on repositories directly.
- API responses should use DTO record types, not entities.
- Keep controllers thin: delegate to services, no data structures stored in controllers.

## API Design Conventions
- Base path: /api/* (e.g., /api/users)
- Resource-oriented routing:
  - GET /api/users → list
  - GET /api/users/{id} → get by id
  - POST /api/users → create
  - PUT /api/users/{id} → replace
  - PATCH /api/users/{id} → partial update (optional)
  - DELETE /api/users/{id} → delete
- Status codes:
  - 200 OK for successful reads/updates
  - 201 Created with Location: /api/resource/{id} on create
  - 204 No Content for successful deletes
  - 400 Bad Request for validation errors
  - 404 Not Found for missing resources
  - 409 Conflict for uniqueness or business-rule violations
- Validation:
  - Use jakarta.validation on DTOs and method parameters.
  - Enable method-level validation with @Validated on controllers; annotate ids with @Positive/@PositiveOrZero as appropriate.

## DTOs (Records) & Normalization
- Use Java record types for all API DTOs.
- Apply validation annotations and compact constructors for normalization (e.g., trim strings, lowercase emails).

Example:
public record CreateUserRequest(
        @NotBlank @Size(max = 50) String name,
        @NotBlank @Email @Size(max = 100) String email
) {
    public CreateUserRequest {
        if (name != null) name = name.trim();
        if (email != null) email = email.trim().toLowerCase();
    }
}

Return type preference:
- Collections: return List<Dto> (not arrays). For pagination, return a wrapper (e.g., PageDto<T> with items, page, size, total).

## Controllers
- Annotate with @RestController and @RequestMapping("/api/...").
- Keep methods small and declarative; no business logic beyond parameter binding and status composition.
- For POST create methods, return ResponseEntity<Dto> with ResponseEntity.created(location).body(created).
- Accept request payloads with @RequestBody @Valid.

Example:
@PostMapping
public ResponseEntity<UserDto> create(@RequestBody @Valid CreateUserRequest req,
                                      UriComponentsBuilder uriBuilder) {
    var created = userService.create(req);
    var location = uriBuilder.path("/api/users/{id}").buildAndExpand(created.id()).toUri();
    return ResponseEntity.created(location).body(created);
}

## Services
- Define an interface per aggregate (e.g., UserService).
- Implement orchestration, cross-entity rules, normalization beyond DTO, and error translations (NotFoundException, ConflictException).
- Services throw domain exceptions; controllers don’t catch them directly—let the global handler map to HTTP.

## Repositories
- Abstract persistence behind repository interfaces.
- In-memory implementations are acceptable for the lab, but isolate storage/ID generation in the repository (not the service).
- If/when JPA is added, use JpaRepository interfaces and map to DTOs in the service or via mappers.

## Error Handling (Centralized)
- Use a single @RestControllerAdvice in com.example.web.error.
- Return RFC-7807 ProblemDetail payloads.
- Handlers to include:
  - NotFoundException → 404
  - ConstraintViolationException (method params) → 400
  - MethodArgumentNotValidException (request bodies) → 400
  - ConflictException (if introduced) → 409
- Include a compact errors map for field-level messages on validation failures.

## Testing Strategy
- Controller tests: @WebMvcTest(ControllerClass.class) + @Import(GlobalExceptionHandler.class).
- Mock the service layer using @MockitoBean (not @MockBean).
- Use MockMvc for request/response verification and AssertJ for assertions where applicable.
- Cover positive and negative paths for every endpoint:
  - Success: 200/201/204 with correct JSON and headers.
  - Validation: invalid payloads and parameter constraints → 400 with error structure.
  - Missing resources: 404.
  - Business conflicts: 409 when applicable.
- Note: MockMvc sets absolute Location by default in tests (e.g., http://localhost/api/users/{id}).

Example imports and setup:
@WebMvcTest(UserController.class)
@Import(GlobalExceptionHandler.class)
class UserControllerTest {
    @Autowired MockMvc mvc;
    @Autowired ObjectMapper objectMapper;
    @org.springframework.test.context.bean.override.mockito.MockitoBean
    UserService userService;
}

Unit tests:
- Add dedicated tests for service-layer rules (e.g., uniqueness → 409).
- Optional: @JsonTest for DTO serialization; @DataJpaTest if JPA is added.

## Persistence Profiles (Optional, Future)
- Profiles: demo (in-memory), dev/test (H2 + JPA).
- Provide profile-specific beans via Spring configuration.
- Keep controller/service APIs stable across profiles.

## Observability & Docs (Optional, Future)
- Add spring-boot-starter-actuator for health, info, metrics in dev.
- Add OpenAPI via springdoc-openapi-starter-webmvc-ui; document endpoints and ProblemDetail responses.

## Security & CORS (Optional, Future)
- If used by a browser client, configure CORS for /api/** in dev.
- If enabling Spring Security, start permissive in dev/test and lock down later.

## Code Style & Conventions
- Prefer constructor injection; classes final where practical.
- No field injection; avoid Lombok in this lab.
- Avoid leaking entities in controller responses; always return DTOs.
- Method/variable naming: descriptive and consistent; avoid abbreviations in public APIs.
- Keep files small and cohesive; one public type per file.

## Antipatterns to Avoid
- Controllers performing persistence or business logic.
- Returning raw Map/Object bodies instead of typed DTOs (except structured error errors map in ProblemDetail).
- Swallowing exceptions in controllers; let @RestControllerAdvice handle mapping.
- Using deprecated @MockBean in tests; use @MockitoBean.
- Mixing repository and service responsibilities.

## Junie Usage Guidelines (Ask vs Code Mode)
- Ask Mode:
  - Use for analyzing existing code, proposing plans, and explaining changes.
  - When asking for examples, prefer those aligned with these guidelines (DTO records, validation, ProblemDetail).
- Code Mode:
  - Always generate a plan first and list affected files (Action Allowlist).
  - For new endpoints: add DTOs, controller methods, service/repo methods, and tests in one PR-sized change.
  - Include migrations notes in MIGRATION.md for non-trivial changes.
- Review Checklist (must pass before applying diffs):
  - Controllers in com.example.web, services in com.example.service.
  - DTOs are records with validation and compact constructors.
  - Endpoints under /api/* with correct status codes and Location headers on create.
  - Centralized error handling with ProblemDetail and field errors map.
  - Tests: @WebMvcTest + @MockitoBean, positive and 4xx cases included.
  - Build passes: ./gradlew test green.

## Ready-to-use Prompts
- Generate endpoints and tests:
  - "Create PUT /api/users/{id} and DELETE /api/users/{id} in com.example.web.UserController. Use DTO records with validation, centralized ProblemDetail error handling, and add comprehensive MockMvc tests with @WebMvcTest and @MockitoBean. Update service/repository accordingly and document in MIGRATION.md."
- Add uniqueness rule:
  - "Enforce unique user email at the service layer; throw ConflictException on duplicates and map to HTTP 409 in GlobalExceptionHandler. Add positive/negative tests."
- Pagination:
  - "Add pagination to GET /api/users with page, size, sort params and return a PageDto<UserDto> wrapper. Include 400 tests for invalid params."

## Acceptance Criteria for New Changes
- Code conforms to package layout and layering rules.
- DTOs are records with validation and normalization.
- Controllers return correct HTTP statuses, bodies, and headers.
- Global exception handler covers new error cases.
- Tests cover success and 4xx paths; CI ./gradlew test passes.
- MIGRATION.md updated with rationale and summary.
