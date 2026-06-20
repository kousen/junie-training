# Lab C: React Forms with TypeScript in WebStorm

## Duration: ~25 minutes for the core exercise; the Extended Practice is self-paced/take-home

## Learning Objectives
- Use Plan mode before implementation
- Drive Junie with one complete, well-scoped prompt (the professional pattern)
- Build accessible React forms with TypeScript and comprehensive validation
- Use React Testing Library effectively
- Understand the impact of project guidelines (`.junie/AGENTS.md`)
- Experience Junie in WebStorm

## Prerequisites
- WebStorm with Junie installed (or Junie CLI)
- Node.js 18+ installed
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
3. Verify the development server works: `npm run dev`
4. Open Junie: **AI Chat panel → Agent dropdown → Junie** (or `Ctrl/Cmd+Alt+J`)
5. Run initial tests: `npm test`

> **Alternative — Junie CLI:** Run `junie` in the project directory.

### Starter code — `src/components/RegisterForm.tsx`
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

## Part 2: The Core Exercise — Plan-First Full Prompt (15-20 minutes)

This is the main lab. It mirrors how a professional drives a coding agent: **one complete,
well-scoped prompt, reviewed before and after** — not a long sequence of tiny instructions.

1. Make sure `.junie/AGENTS.md` exists. If it does not, generate it first — see
   **"Generate project guidelines"** under Extended Practice, then come back here.
2. Start in Plan mode and paste:

```
Inspect the React TypeScript project and create a plan first. Wait for approval before editing.

After approval, implement RegisterForm end to end:
- Email validation
- Password validation: at least 8 characters, one number, one special character
- Confirm password must match
- Terms checkbox is required
- Accessible labels, error messages, and keyboard behavior
- TypeScript interfaces for form data and component props
- React Testing Library tests for render, validation errors, successful submit, and accessibility-oriented queries
- Run npm test and fix failures

Follow .junie/AGENTS.md. Keep the diff focused and summarize changed files, test results, and accessibility choices.
```

3. **Review the plan before approving.** This is the teaching moment — approve only after
   the plan includes the validation strategy, accessibility, and tests. Ask the room what
   they'd change.
4. After approval, **review the diff and the test output** before accepting the result.

### Optional: the guidelines contrast (5 minutes)

To show *why* guidelines matter, build a first version **before** creating `.junie/AGENTS.md`,
then create the guidelines and rebuild. Compare the two for query strategy (accessible roles
vs. test IDs), validation approach, and accessibility coverage. The full step-by-step version
of this comparison lives in Extended Practice below.

---

## Extended Practice (Take-Home / If Time Allows)

The tasks below break the same workflow into smaller steps. They are ideal for **self-paced
practice after the workshop**, or for filling time if your group moves quickly. You will
**not** complete all of these in a four-hour session — the Core Exercise above is the lab.

### Analyze requirements with Ask Mode
```
I need to build a registration form with these requirements:
- Email field with validation
- Password field (min 8 chars, 1 special, 1 number)
- Confirm password field (must match)
- Terms checkbox (must be checked)
- Accessible with ARIA labels
What's the best approach using React, TypeScript, and React Hook Form?
```
Review recommendations for form library, validation approach (Yup vs Zod vs custom),
accessibility, and testing strategy.

### Build the form WITHOUT guidelines
In Code mode:
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
Then add initial tests:
```
Create tests for RegisterForm using React Testing Library:
- Test form rendering
- Test validation errors
- Test successful submission
- Test accessibility
```
Run tests: `npm test`

### Generate project guidelines
In Ask mode:
```
Analyze this React TypeScript project and generate an AGENTS.md file with
guidelines covering: technology stack, TypeScript standards, form patterns,
accessibility requirements, testing standards, and component structure.
Save it to .junie/AGENTS.md
```
> **Note:** The legacy path `.junie/guidelines.md` still works, but `AGENTS.md` is the current standard.

**Refine as needed** — for example: "Query by accessible roles first, never use test IDs
unless necessary," a coverage target, `interface` over `type` for component props, or an
error summary at the top of the form for screen readers.

### Rebuild with guidelines and compare
Delete the previous implementation and request:
```
Create a registration form following our guidelines:
1. Use React Hook Form with Zod validation
2. Implement all accessibility requirements
3. Create proper TypeScript interfaces
4. Follow our component structure
5. Include comprehensive error handling
```
Compare the quality difference — this is the with/without-guidelines contrast in detail.

### Accessibility and interaction tests
```
Add comprehensive accessibility tests:
1. Test with jest-axe for WCAG compliance
2. Test keyboard navigation
3. Test screen reader announcements
4. Test focus management
5. Test error announcements
```
```
Create user interaction tests:
1. Test complete form fill and submit
2. Test validation on blur
3. Test password visibility toggle
4. Test form reset
5. Test loading states during submission
Use @testing-library/user-event for realistic interactions
```

### Advanced features
```
Add a real-time password strength indicator:
1. Show strength as user types (Weak/Fair/Good/Strong)
2. Visual progress bar
3. List requirements with checkmarks
4. Update aria-live region for screen readers
5. Add tests for all strength levels
```
```
Implement form persistence:
1. Save form progress to localStorage
2. Restore on page reload
3. Clear on successful submission
4. Add "Clear form" button
5. Test persistence behavior
```
```
Add async email uniqueness check:
1. Debounce email input (500ms)
2. Simulate API call to check availability
3. Show loading state during check
4. Display availability message
5. Test with mock API calls
```

### Performance optimization
Ask mode first: `Analyze the RegisterForm component for performance issues`
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

✓ One complete, plan-first prompt beats a long sequence of tiny instructions
✓ Accessibility-first development
✓ Type-safe form handling
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
