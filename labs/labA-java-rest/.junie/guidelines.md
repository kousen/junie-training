# Guidelines (Java/Spring/JUnit/AssertJ)
- Java 25.
- Controllers in `com.example.web`; services in `com.example.service`.
- Return DTO **records**; compact constructors for validation/normalization.
- HTTP routes under `/api/*`; include negative/4xx tests.
- Tests: JUnit 6 + AssertJ (`assertThat`).
- Keep functions small and intention-revealing.
