# Guidelines (Java/Spring/JUnit/AssertJ)

## Java and Spring
- Use Java 21.
- Keep the application small and idiomatic for a Spring Boot teaching lab.
- Controllers belong in `com.example.web`; services belong in `com.example.service`.
- Prefer constructor injection.
- Keep functions small and intention-revealing.

## API Design
- Put HTTP routes under `/api/*`.
- Return API DTOs as Java `record`s.
- Use compact constructors in records for validation or normalization when appropriate.
- Normalize user input consistently, such as trimming names and lowercasing emails.
- Use `ProblemDetail` for structured error responses.
- Prefer `@RestControllerAdvice` for shared exception handling.

## Testing
- Use JUnit 5 and AssertJ with `assertThat`.
- Use `@WebMvcTest` and `MockMvc` for controller tests.
- Include success and negative/4xx tests for API endpoints.
- Add focused service unit tests when services contain business logic, ordering, storage, ID generation, or lookup behavior.
- Run `./gradlew test` after implementation changes.

## Project Hygiene
- Keep shared Junie guidance files versioned, including `.junie/AGENTS.md` and `.junie/guidelines.md`.
- Do not commit local/session artifacts such as `.junie/memory/` or `.junie/plans/`.
