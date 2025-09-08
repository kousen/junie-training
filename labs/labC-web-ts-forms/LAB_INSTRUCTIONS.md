# Lab C: React Forms with TypeScript in WebStorm

## Duration: 30-45 minutes

## Learning Objectives
- Build accessible React forms with TypeScript
- Implement comprehensive validation
- Use React Testing Library effectively
- Follow accessibility best practices
- Achieve 90%+ test coverage
- Experience Junie in WebStorm

## Prerequisites
- WebStorm with Junie installed
- Node.js 16+ installed
- npm or yarn configured
- Basic React and TypeScript knowledge

## Part 1: Project Setup (5 minutes)

1. Open the `labC-web-ts-forms` project in WebStorm
2. Install dependencies:
```bash
npm install
# or
yarn install
```
3. Verify the development server works:
```bash
npm run dev
```
4. Open Junie panel: View → Tool Windows → Junie
5. Run initial tests: `npm test`

## Part 2: Analyze Requirements (5 minutes)

### Task 1: Understand the Requirements

In Ask mode, request:
```
I need to build a registration form with these requirements:
- Email field with validation
- Password field (min 8 chars, 1 special, 1 number)
- Confirm password field (must match)
- Terms checkbox (must be checked)
- Accessible with ARIA labels
What's the best approach using React, TypeScript, and React Hook Form?
```

Review Junie's recommendations for:
- Form library choice (React Hook Form vs Formik)
- Validation approach (Yup vs Zod vs custom)
- Accessibility requirements
- Testing strategies

### Current Starter Code

`src/components/RegisterForm.tsx`:
```tsx
import React from 'react';

export const RegisterForm: React.FC = () => {
  return (
    <form>
      <h2>Register</h2>
      {/* TODO: Implement form */}
    </form>
  );
};
```

## Part 3: Build Form WITHOUT Guidelines (10 minutes)

### Task 2: Create Basic Form

In Code mode, request:
```
Create a registration form component with:
1. Email input with validation
2. Password input (min 8 chars, 1 special character, 1 number)
3. Confirm password (must match password)
4. Terms and conditions checkbox
5. Submit button
6. Display validation errors
Use React Hook Form and TypeScript
```

Review the generated code and note:
- Form structure
- Validation approach
- Error handling
- TypeScript usage

### Task 3: Add Initial Tests

Still in Code mode:
```
Create tests for RegisterForm using React Testing Library:
- Test form rendering
- Test validation errors
- Test successful submission
- Test accessibility
```

Run tests: `npm test`

## Part 4: Create Guidelines and Rebuild (10 minutes)

### Task 4: Create React/TypeScript Guidelines

Create `.junie/guidelines.md`:

```markdown
# React TypeScript Form Guidelines

## Technology Stack
- React 18 with TypeScript
- React Hook Form for form management
- Zod for schema validation
- React Testing Library for tests
- Jest for test runner

## Component Standards

### TypeScript
- Strict mode enabled
- Explicit return types for all functions
- Interface over type for component props
- Proper generic types for hooks

```typescript
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

interface RegisterFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  initialValues?: Partial<FormData>;
}
```

## Form Patterns

### React Hook Form with Zod
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string()
    .min(8, 'Minimum 8 characters')
    .regex(/[!@#$%^&*]/, 'Must contain special character')
    .regex(/[0-9]/, 'Must contain number'),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val, 'Must accept terms')
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});
```

## Accessibility Requirements

### Form Fields
- All inputs must have associated labels
- Use semantic HTML elements
- Proper ARIA attributes for errors
- Focus management on errors

```tsx
<div role="group" aria-labelledby="email-label">
  <label id="email-label" htmlFor="email">
    Email Address
    <span aria-label="required">*</span>
  </label>
  <input
    id="email"
    type="email"
    aria-invalid={!!errors.email}
    aria-describedby={errors.email ? "email-error" : undefined}
    {...register('email')}
  />
  {errors.email && (
    <span id="email-error" role="alert" className="error">
      {errors.email.message}
    </span>
  )}
</div>
```

## Validation Patterns

### Custom Validators
```typescript
const passwordStrength = (password: string): boolean => {
  const hasMinLength = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  
  return hasMinLength && hasSpecialChar && hasNumber && hasUpperCase && hasLowerCase;
};
```

## Testing Standards

### React Testing Library
- Query by accessible roles first
- Never use test IDs unless absolutely necessary
- Test user interactions, not implementation
- Test accessibility with jest-axe

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

test('form is accessible', async () => {
  const { container } = render(<RegisterForm />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('shows validation errors on submit', async () => {
  const user = userEvent.setup();
  render(<RegisterForm />);
  
  const submitButton = screen.getByRole('button', { name: /register/i });
  await user.click(submitButton);
  
  expect(screen.getByRole('alert')).toHaveTextContent(/email is required/i);
});
```

### Test Coverage Requirements
- Minimum 90% coverage
- Test all validation rules
- Test happy path and error states
- Test accessibility

## Component Structure

### File Organization
```
src/
  components/
    RegisterForm/
      RegisterForm.tsx
      RegisterForm.test.tsx
      RegisterForm.module.css
      validation.ts
      types.ts
```

## State Management
- Use React Hook Form for form state
- Local state with useState for UI state only
- No global state for forms unless necessary

## Error Handling
- Display inline validation errors
- Show field-level errors immediately
- Summary errors at top for screen readers
- Clear error messages

## Performance
- Lazy load validation schemas
- Debounce async validation
- Memoize expensive computations
- Use React.memo for pure components
```

### Task 5: Rebuild with Guidelines

Delete the previous implementation and request:
```
Create a registration form following our guidelines:
1. Use React Hook Form with Zod validation
2. Implement all accessibility requirements
3. Create proper TypeScript interfaces
4. Follow our component structure
5. Include comprehensive error handling
```

Compare the quality difference.

## Part 5: Comprehensive Testing (10 minutes)

### Task 6: Create Accessibility Tests

In Code mode:
```
Add comprehensive accessibility tests:
1. Test with jest-axe for WCAG compliance
2. Test keyboard navigation
3. Test screen reader announcements
4. Test focus management
5. Test error announcements
```

### Task 7: Add User Interaction Tests

```
Create user interaction tests:
1. Test complete form fill and submit
2. Test validation on blur
3. Test password visibility toggle
4. Test form reset
5. Test loading states during submission
Use @testing-library/user-event for realistic interactions
```

### Task 8: Coverage Analysis

```
Review test coverage and add missing tests:
1. Show current coverage report
2. Identify uncovered branches
3. Add edge case tests
4. Test error boundaries
Target: 95% coverage
```

Run coverage: `npm test -- --coverage`

## Part 6: Advanced Features (10 minutes)

### Task 9: Add Password Strength Indicator

In Code mode:
```
Add a real-time password strength indicator:
1. Show strength as user types (Weak/Fair/Good/Strong)
2. Visual progress bar
3. List requirements with checkmarks
4. Update aria-live region for screen readers
5. Add tests for all strength levels
```

### Task 10: Add Form Persistence

```
Implement form persistence:
1. Save form progress to localStorage
2. Restore on page reload
3. Clear on successful submission
4. Add "Clear form" button
5. Test persistence behavior
```

### Task 11: Add Async Email Validation

```
Add async email uniqueness check:
1. Debounce email input (500ms)
2. Simulate API call to check availability
3. Show loading state during check
4. Display availability message
5. Test with mock API calls
```

## Part 7: Optimization (5 minutes)

### Task 12: Performance Optimization

Ask mode first:
```
Analyze the RegisterForm component for performance issues
```

Then Code mode:
```
Optimize the form for performance:
1. Memoize validation schemas
2. Optimize re-renders with React.memo
3. Use useCallback for event handlers
4. Lazy load error messages
5. Add performance tests
```

## Reflection Questions

1. How did accessibility requirements influence the implementation?
2. What benefits did TypeScript provide for form handling?
3. How did React Testing Library's queries enforce good practices?
4. What patterns from the guidelines were most valuable?

## Common Issues and Solutions

**Issue**: TypeScript errors with React Hook Form
**Solution**: Ensure proper generic types: `useForm<FormData>()`

**Issue**: Tests failing with "not wrapped in act()"
**Solution**: Use `waitFor` for async operations

**Issue**: Accessibility tests failing
**Solution**: Check for missing labels, ARIA attributes

**Issue**: Form not validating on submit
**Solution**: Check zodResolver integration

## Challenge Extensions

1. Add multi-step form wizard
2. Implement field arrays (dynamic fields)
3. Add internationalization (i18n)
4. Create custom form field components
5. Add E2E tests with Playwright

## Best Practices Demonstrated

✓ Accessibility-first development
✓ Type-safe form handling
✓ Comprehensive validation
✓ User-friendly error messages
✓ Thorough test coverage

## Testing Checklist

- [ ] All fields have labels
- [ ] Errors are announced to screen readers
- [ ] Keyboard navigation works
- [ ] No accessibility violations (jest-axe)
- [ ] All validation rules tested
- [ ] Success path tested
- [ ] Error states tested
- [ ] 90%+ code coverage

## Final Verification

1. Run accessibility audit: `npm run test:a11y`
2. Run tests with coverage: `npm test -- --coverage`
3. Test with screen reader (NVDA/JAWS/VoiceOver)
4. Test keyboard-only navigation
5. Test on mobile viewport