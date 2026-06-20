# Sample Junie Prompts for Common Tasks

## Plan-First Prompts

Use these when the task is large enough that the implementation strategy matters.

### General Plan
```
Before making changes, inspect the project and create a plan for this task:
[describe task]

Include:
- Requirements and assumptions
- Technical design
- Files you expect to touch
- Tests you will add or update
- Risks or open questions

Wait for my approval before implementing.
```

### Full Implementation Prompt
```
Use the project guidelines and implement this feature end to end:
[describe feature]

Acceptance criteria:
- [criterion 1]
- [criterion 2]
- [criterion 3]

Please:
- Create or update tests first where practical
- Make the smallest coherent set of code changes
- Run the relevant test command
- Summarize changed files, test results, and any follow-up risks
```

## Java / Spring Boot

### REST API Development
```
Create a plan first, then implement a REST controller for managing products with:
- GET /api/products (with pagination and sorting)
- GET /api/products/{id}
- POST /api/products (with validation)
- PUT /api/products/{id}
- DELETE /api/products/{id}
Use DTOs, proper status codes, and error handling
```

### Testing
```
Generate comprehensive tests for ProductService using:
- JUnit 5 for test framework
- Mockito for mocking dependencies
- AssertJ for assertions
- Test both success and failure scenarios
- Achieve at least 85% code coverage
```

### Refactoring
```
Refactor the OrderService class to:
- Extract business logic from the controller
- Implement proper dependency injection
- Add logging with SLF4J
- Follow SOLID principles
- Maintain backward compatibility
```

## Python

### Code Quality
```
Create a plan first, then refactor math_utils.py to:
- Follow PEP 8 standards
- Add type hints for all functions
- Include Google-style docstrings
- Handle edge cases properly
- Raise appropriate exceptions
```

### Testing
```
Create pytest tests for the data_processor module:
- Use parametrize for multiple test cases
- Mock external API calls
- Test error conditions with pytest.raises
- Use fixtures for common test data
- Generate coverage report
```

### Documentation
```
Add comprehensive documentation to the analytics package:
- Module-level docstrings explaining purpose
- Function docstrings with Args, Returns, Raises
- Usage examples in docstrings
- Type hints throughout
```

## React / TypeScript

### Component Development
```
Create a plan first, then build a SearchBar component with:
- Debounced input (500ms)
- Loading state during search
- Error handling
- Accessibility (ARIA labels)
- TypeScript interfaces
- Unit tests with React Testing Library
```

### Form Validation
```
Add form validation to RegistrationForm:
- Email format validation
- Password strength requirements (8+ chars, special char, number)
- Password confirmation matching
- Real-time validation feedback
- Accessible error messages
- Tests for all validation rules
```

### Performance
```
Optimize the ProductList component:
- Implement virtual scrolling for large lists
- Add React.memo for child components
- Use useCallback for event handlers
- Lazy load images
- Add loading skeletons
```

## Database / SQL

### Migration
```
Create a database migration to:
- Add a 'status' column to orders table
- Set default value to 'pending'
- Migrate existing data appropriately
- Add index for performance
- Include rollback script
```

### Query Optimization
```
Analyze and optimize this slow query:
[paste query here]
- Explain the current execution plan
- Identify bottlenecks
- Suggest indexes
- Rewrite for better performance
```

## Bug Fixes

### Debugging
```
Debug this NullPointerException:
[paste stack trace]
- Identify root cause
- Fix the issue
- Add null checks where needed
- Write a test to prevent regression
```

### Memory Issues
```
Investigate memory leak in UserService:
- Identify potential leak sources
- Check for unclosed resources
- Review collection usage
- Implement proper cleanup
- Add monitoring logs
```

## Code Review

### Security Review
```
Review this authentication code for security issues:
[paste code]
- Check for SQL injection
- Verify password handling
- Review session management
- Check for XSS vulnerabilities
- Suggest improvements
```

### Performance Review
```
Review this API endpoint for performance:
- Analyze database queries
- Check for N+1 problems
- Review caching opportunities
- Suggest async processing where appropriate
- Recommend monitoring points
```

## DevOps / CI/CD

### Docker
```
Create a Dockerfile for this Spring Boot application:
- Use multi-stage build
- Minimize image size
- Include health check
- Set proper environment variables
- Add non-root user
```

### GitHub Actions
```
Create a GitHub Actions workflow that:
- Runs on pull requests
- Builds the application
- Runs all tests
- Checks code coverage (min 80%)
- Runs linting
- Posts results as PR comment
```

## Documentation

### API Documentation
```
Generate OpenAPI/Swagger documentation for all REST endpoints:
- Include request/response examples
- Document error responses
- Add authentication requirements
- Include rate limiting info
- Generate interactive UI
```

### README
```
Create a comprehensive README with:
- Project description
- Prerequisites
- Installation steps
- Configuration options
- Usage examples
- API documentation link
- Contributing guidelines
- License information
```

## MCP Tool Prompts

### context7 Usage
```
Use /mcp if context7 is not configured yet. Then use context7 to:
- Find the latest stable version of React Router
- Get migration guide from v5 to v6
- Check breaking changes
- Show code examples for new patterns
```

### Migration Planning with context7
```
Create a migration plan before editing files.

Use context7 to:
- Check current React 18 migration guidance
- Check breaking changes
- Identify files in this project affected by the migration
- Propose a small first implementation slice

Wait for approval before applying dependency or source changes.
```

### Playwright Generation
```
Use Playwright to generate E2E tests for:
- User registration flow
- Product purchase journey
- Admin dashboard access
Include page objects, retry logic, and screenshots on failure
```

## Agent Skill Prompts

### Create a Project Skill
```
Create a project Skill named [skill-name] in .junie/skills/[skill-name].

The Skill should guide Junie whenever it [describe task].
It should include:
- Clear YAML frontmatter with name and description
- Focused instructions, not generic advice
- Examples from this project when useful
- A checklist or template only if it makes the Skill easier to reuse

After creating it, summarize when Junie should use it.
```

### Create a Playwright E2E Skill
```
Create a project Skill named playwright-e2e in .junie/skills/playwright-e2e.

The Skill should guide Junie when creating or improving Playwright tests:
- Prefer user-visible behavior over implementation details
- Prefer accessible locators such as getByRole and getByLabel
- Use page objects only after selector or navigation duplication appears
- Keep tests deterministic and avoid arbitrary sleeps
- Run npx playwright test after changes when dependencies are installed
- Summarize failures, trace/report locations, and screenshots
- Do not require Playwright MCP for repeatable local test runs

Include a concise SKILL.md with good frontmatter. Add a small checklist file if helpful.
```

### Use an Existing Skill
```
Use the [skill-name] Skill for this task:
[describe task]

Before editing, summarize which Skill rules are relevant. After editing, run the relevant local verification command and report the result.
```

## Tips for Effective Prompts

1. **Be Specific**: Include exact requirements, constraints, and technologies
2. **Provide Context**: Mention existing patterns, frameworks, and standards
3. **Set Expectations**: Specify coverage targets, performance goals, or quality metrics
4. **Iterate**: Start simple and refine based on results
5. **Save Good Ones**: Keep a library of prompts that work well for your team
