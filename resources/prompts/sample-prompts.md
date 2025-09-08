# Sample Junie Prompts for Common Tasks

## Java / Spring Boot

### REST API Development
```
Create a REST controller for managing products with:
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
Refactor math_utils.py to:
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
Create a SearchBar component with:
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
Use context7 to:
- Find the latest stable version of React Router
- Get migration guide from v5 to v6
- Check breaking changes
- Show code examples for new patterns
```

### Playwright Generation
```
Use Playwright to generate E2E tests for:
- User registration flow
- Product purchase journey
- Admin dashboard access
Include page objects, retry logic, and screenshots on failure
```

## Tips for Effective Prompts

1. **Be Specific**: Include exact requirements, constraints, and technologies
2. **Provide Context**: Mention existing patterns, frameworks, and standards
3. **Set Expectations**: Specify coverage targets, performance goals, or quality metrics
4. **Iterate**: Start simple and refine based on results
5. **Save Good Ones**: Keep a library of prompts that work well for your team