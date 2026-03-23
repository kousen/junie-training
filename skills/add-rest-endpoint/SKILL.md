---
name: add-rest-endpoint
description: Scaffold a new REST endpoint with controller, service, DTO, tests, and error handling following project conventions
---

# Add REST Endpoint

When asked to add a new REST endpoint, follow this structured workflow.

## Step 1 — Gather Requirements

Before writing code, confirm:
- **Resource name** (e.g., "products", "orders")
- **Operations needed** (CRUD or a subset)
- **Fields** on the resource and their types
- **Validation rules** (required fields, format constraints, ranges)
- **Relationships** to existing resources (if any)

If any of these are unclear, ask before proceeding.

## Step 2 — Create the DTO Record

Create a Java record in the `dto` package:
- Use a compact constructor for validation and normalization (trim strings, lowercase emails)
- Add Jakarta Validation annotations (`@NotBlank`, `@Email`, `@Size`, etc.)
- Keep DTOs focused — create separate request/response records if they diverge

## Step 3 — Create the Service

Create a service class with:
- Constructor-based dependency injection only
- Business logic separated from HTTP concerns
- Meaningful exception types for error cases (e.g., `ResourceNotFoundException`)
- In-memory storage (ConcurrentHashMap + AtomicLong) for training labs, or repository injection for real projects

## Step 4 — Create the Controller

Create a controller in the `web` package:
- All routes under `/api/<resource>`
- Use plural nouns for resource paths
- Return appropriate HTTP status codes:
  - `200 OK` for GET/PUT
  - `201 Created` for POST (use `ResponseEntity` with Location header)
  - `204 No Content` for DELETE
  - `404 Not Found` when resource doesn't exist
- Add `@Valid` on request body parameters
- Delegate all logic to the service — no business logic in the controller

## Step 5 — Add Error Handling

Ensure the global exception handler covers:
- `ResourceNotFoundException` → 404
- `MethodArgumentNotValidException` → 400 with field-level errors
- Return structured JSON error responses

## Step 6 — Write Tests

Create comprehensive tests:
- **Controller tests** (`@WebMvcTest`) covering:
  - Successful operations (2xx)
  - Validation failures (400)
  - Not-found cases (404)
- **Service unit tests** with direct assertions
- Use AssertJ `assertThat` exclusively
- Use `@MockitoBean` (not the deprecated `@MockBean`)

## Step 7 — Document

Add a summary of the new endpoint to `MIGRATION.md`, including:
- Route paths and methods
- Request/response shapes
- Any notable design decisions
