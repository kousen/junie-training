# Registration Form - Interactive Testing Guide

This guide provides comprehensive instructions for manually testing and interacting with the registration form to explore all its features, validations, and behaviors.

## Prerequisites

Make sure the development server is running:
```bash
npm run dev
```

Visit: http://localhost:5173

---

## 1. Test Empty Form Submission

**Steps:**
1. Open the form in your browser
2. Click the "Register" button WITHOUT filling any fields
3. Observe the validation errors

**Expected Results:**
- ⚠ "Email is required" appears below email field
- ⚠ "Password is required" appears below password field
- ⚠ "Please confirm your password" appears below confirm password field
- ⚠ "You must accept the terms" appears below checkbox
- All error messages display with a warning icon (⚠)
- Error messages are red and clearly visible

---

## 2. Test Email Validation

**Test Case A: Invalid Email Format**

**Steps:**
1. Clear the form (refresh page)
2. Type `notanemail` in the Email field
3. Fill other fields with valid data:
   - Password: `Password1!`
   - Confirm Password: `Password1!`
   - Check the terms checkbox
4. Click "Register"

**Expected Results:**
- ⚠ "Enter a valid email address" error appears
- Email field border turns red
- Email field background becomes light red

**Test Case B: Valid Email**

**Steps:**
1. Change email to `user@example.com`
2. Click "Register"

**Expected Results:**
- Email error disappears
- Email field returns to normal styling

---

## 3. Test Password Validation Rules

**Test Case A: Password Too Short**

**Steps:**
1. Clear the form
2. Enter email: `test@example.com`
3. Enter password: `Pass1!` (only 6 characters)
4. Enter confirm password: `Pass1!`
5. Check terms
6. Click "Register"

**Expected Results:**
- ⚠ "Password must be at least 8 characters" error appears

**Test Case B: Missing Number**

**Steps:**
1. Change password to: `Password!` (no number)
2. Change confirm password to: `Password!`
3. Click "Register"

**Expected Results:**
- ⚠ "Password must include at least one number" error appears

**Test Case C: Missing Special Character**

**Steps:**
1. Change password to: `Password1` (no special character)
2. Change confirm password to: `Password1`
3. Click "Register"

**Expected Results:**
- ⚠ "Password must include at least one special character" error appears

**Test Case D: Valid Password**

**Steps:**
1. Change password to: `GoodPass1!` (8+ chars, has number, has special char)
2. Change confirm password to: `GoodPass1!`
3. Click "Register"

**Expected Results:**
- Password errors disappear
- ✅ "Registered!" success message appears in green box

---

## 4. Test Password Confirmation

**Test Case A: Passwords Don't Match**

**Steps:**
1. Clear the form
2. Enter email: `test@example.com`
3. Enter password: `Password1!`
4. Enter confirm password: `Password2!` (different!)
5. Check terms
6. Click "Register"

**Expected Results:**
- ⚠ "Passwords must match" error appears below confirm password field

**Test Case B: Passwords Match**

**Steps:**
1. Change confirm password to: `Password1!` (matches now)
2. Click "Register"

**Expected Results:**
- Error disappears
- ✅ "Registered!" success message appears

---

## 5. Test Terms and Conditions Checkbox

**Test Case A: Checkbox Unchecked**

**Steps:**
1. Clear the form
2. Fill all fields correctly:
   - Email: `user@example.com`
   - Password: `Password1!`
   - Confirm Password: `Password1!`
3. Leave the terms checkbox UNCHECKED
4. Click "Register"

**Expected Results:**
- ⚠ "You must accept the terms" error appears

**Test Case B: Checkbox Checked**

**Steps:**
1. Click the terms checkbox to check it
2. Click "Register"

**Expected Results:**
- ✅ "Registered!" success message appears

---

## 6. Test Real-Time Password Matching

**Steps:**
1. Clear the form
2. Enter password: `Password1!`
3. Enter confirm password: `Password1!`
4. Check terms
5. Enter email: `test@example.com`
6. Now go back and change the PASSWORD field to: `NewPassword1!`
7. Click "Register"

**Expected Results:**
- When you change the password, the confirm password field should now show mismatch error
- This tests that password matching is reactive

---

## 7. Test Successful Registration

**Complete Happy Path:**

**Steps:**
1. Clear the form (refresh page)
2. Enter email: `newuser@example.com`
3. Enter password: `SecurePass123!`
4. Enter confirm password: `SecurePass123!`
5. Check the terms checkbox
6. Click "Register"

**Expected Results:**
- No error messages appear
- ✅ Green success box appears at bottom with "Registered!"
- Success message has a slide-in animation
- All form fields remain filled

---

## 8. Test Accessibility Features

### Keyboard Navigation

**Steps:**
1. Refresh the page
2. Press `Tab` key repeatedly to navigate through:
   - Email field (should highlight with blue border)
   - Password field (should highlight with blue border)
   - Confirm Password field (should highlight with blue border)
   - Terms checkbox (should show focus ring)
   - Register button (should show focus/hover state)
3. Try filling the form using only keyboard:
   - Type in each field
   - Press `Space` to check the checkbox
   - Press `Enter` or `Space` on Register button to submit

**Expected Results:**
- All fields are accessible via Tab key
- Focus indicators are clearly visible
- Form can be completed entirely with keyboard

### Screen Reader Features (if available)

**ARIA Attributes to Verify:**
- Each input has a proper `id` and matching `label` with `htmlFor`
- Error messages have `role="alert"` for screen reader announcements
- Invalid fields have `aria-invalid="true"`
- Error messages are connected via `aria-describedby`
- Success message has `role="status"`

---

## 9. Test Visual Feedback

**Interactive States:**

**Steps:**
1. Hover over input fields - observe focus effect (blue border, shadow)
2. Click into a field - see focus styling
3. Enter invalid data - see red border and red background
4. Hover over Register button - observe lift effect and shadow
5. Click Register button - observe press effect

**Expected Visual Behaviors:**
- Input fields: Gray → Blue on focus
- Invalid fields: Red border + light red background
- Button hover: Lifts up with shadow
- Button click: Presses down
- Success message: Slides in from above

---

## 10. Test Edge Cases

**Test Case A: Copy-Paste Email**

**Steps:**
1. Copy an email address: `copy@paste.com`
2. Paste into email field
3. Submit form with valid other fields

**Expected Results:**
- Works correctly

**Test Case B: Spaces in Password**

**Steps:**
1. Enter password with spaces: `Pass word1!`
2. Enter same in confirm: `Pass word1!`

**Expected Results:**
- Accepted (spaces are valid characters)

**Test Case C: Very Long Inputs**

**Steps:**
1. Enter extremely long email: `verylongemailaddress@extremelylongdomainname.com`
2. Enter very long password: `VeryLongPassword123!@#$%^&*`

**Expected Results:**
- Form handles long inputs gracefully
- Fields don't break layout

---

## 11. Performance & Responsiveness

**Steps:**
1. Resize browser window to mobile size (e.g., 375px width)
2. Verify form looks good on small screens
3. Try all interactions on small screen
4. Resize back to desktop size

**Expected Results:**
- Form is responsive and usable at all screen sizes
- Purple gradient background adapts
- Form card remains readable and accessible

---

## Summary Checklist

Use this checklist to verify you've explored all features:

- [ ] Empty form submission shows all required errors
- [ ] Invalid email format is caught
- [ ] Password too short is rejected
- [ ] Password without number is rejected
- [ ] Password without special character is rejected
- [ ] Mismatched passwords are caught
- [ ] Unchecked terms prevents submission
- [ ] Valid form shows success message
- [ ] Keyboard navigation works completely
- [ ] Visual feedback on hover/focus works
- [ ] Error messages are clear and helpful
- [ ] Success message animates properly
- [ ] Form is responsive on mobile sizes
- [ ] All ARIA attributes work for accessibility

---

## Running Automated Tests

To verify programmatic correctness, run the test suite:

```bash
npm test
```

**Expected Results:**
- All 8 tests pass:
  - 2 validation helper tests
  - 6 RegisterForm component tests
- Test coverage should be 90%+

---

## What Makes This Form Special?

1. **React Hook Form Integration**: Uses modern React form management
2. **TypeScript Safety**: Full type checking for form values
3. **Accessibility First**: Proper ARIA labels, roles, and keyboard navigation
4. **Real-time Validation**: Errors update as you type (after first submission)
5. **Visual Feedback**: Clear states for normal, focus, error, and success
6. **Comprehensive Testing**: Both unit and integration tests
7. **Modern Styling**: Purple gradient, smooth animations, professional design
8. **Best Practices**: Separated validation logic, component composition

---

## Next Steps

After exploring the form interactively:

1. Review the source code in `src/components/RegisterForm.tsx`
2. Check the validation logic in `src/utils/validation.ts`
3. Examine the tests in `tests/` directory
4. Try modifying validation rules and see changes live
5. Add new fields or validation rules as practice
6. Review the styling in `src/App.css`

Enjoy exploring your registration form! 🎉
