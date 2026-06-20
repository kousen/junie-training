---
name: add-rest-endpoint
description: Scaffold a REST endpoint with controller, service, DTOs, tests, and error handling using project conventions.
---

# Add REST Endpoint

Use this skill when adding or expanding a REST API.

## Workflow

1. Confirm the resource name, required operations, fields, validation rules, and persistence expectations.
2. Create request/response DTOs as records where the language and framework support them.
3. Keep HTTP concerns in controllers and business rules in services.
4. Use constructor injection only.
5. Add validation on request bodies and map errors to clear 4xx responses.
6. Add tests for success, validation failures, and not-found behavior.
7. Run the relevant test command and report results.

## Spring Boot Conventions

- Routes use plural nouns under `/api/*`.
- Use `201 Created` for successful POST requests when a new resource is created.
- Use structured JSON error responses.
- Prefer JUnit 5, MockMvc, and AssertJ.
- Do not use deprecated Spring test annotations when a current replacement exists.

