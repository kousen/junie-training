# Guidelines (Java/Spring/JUnit/AssertJ)
- Java 25 and Spring Boot 4 (`4.1.2`).
- Controllers in `com.example.web`; services in `com.example.service`; DTO records in `com.example.dto`.
- Return DTO **records**; use Jakarta Bean Validation (`@NotBlank`, `@Email`, `@Valid`) for request constraints and compact constructors for input normalization (`trim()`, lowercase email) and invariant checks.
- HTTP routes under `/api/*`; include negative/4xx tests.
- Tests: JUnit 6 + AssertJ (`assertThat`), verified with JaCoCo (`./gradlew test`) and PIT mutation testing (`./gradlew pitest`).
- Keep functions small and intention-revealing.
