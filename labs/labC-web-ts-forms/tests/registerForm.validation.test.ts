import {
  checkEmailAvailability,
  clearRegisterFormData,
  DEFAULT_REGISTER_FORM_DATA,
  evaluatePasswordStrength,
  loadRegisterFormData,
  REGISTER_FORM_STORAGE_KEY,
  saveRegisterFormData,
  validateRegisterForm
} from '../src/validation/registerForm';
import type { RegisterFormData } from '../src/validation/registerForm';

const validData: RegisterFormData = {
  email: 'person@example.com',
  password: 'abcdef1!',
  confirmPassword: 'abcdef1!',
  acceptedTerms: true
};

test('accepts fully valid data at the eight-character password boundary', () => {
  expect(validateRegisterForm(validData)).toEqual({});
});

test('returns all required field errors in a deterministic order', () => {
  const data = { email: '', password: '', confirmPassword: '', acceptedTerms: false };
  const expected = {
    email: 'Email is required.',
    password: 'Password is required.',
    confirmPassword: 'Confirm your password.',
    acceptedTerms: 'Accept the terms to register.'
  };
  expect(validateRegisterForm(data)).toEqual(expected);
  expect(validateRegisterForm(data)).toEqual(expected);
  expect(Object.keys(validateRegisterForm(data))).toEqual(Object.keys(expected));
});

test('requires an email after trimming whitespace', () => {
  expect(validateRegisterForm({ ...validData, email: ' \t\n ' })).toEqual({
    email: 'Email is required.'
  });
});

test.each([
  'person', 'person@', '@example.com', 'person@example',
  'per son@example.com', 'person@exam ple.com', 'person@@example.com',
  'person@.example.com', 'person@example..com', 'person@example.com.'
])('rejects malformed email %j', email => {
  expect(validateRegisterForm({ ...validData, email })).toEqual({
    email: 'Enter a valid email address, such as name@example.com.'
  });
});

test.each(['person@example.com', 'first.last+tag@sub.example.co.uk', ' \tperson@example.com\n '])(
  'accepts practical email format %j', email => {
    expect(validateRegisterForm({ ...validData, email })).toEqual({});
  }
);

test.each([
  ['abcde1!', 'Use at least 8 characters for your password.'],
  ['abcdefg!', 'Include at least one number (0–9) in your password.'],
  ['abcdef12', 'Include at least one special character, such as ! or @, in your password.']
])('checks the independent password rule for %j', (password, message) => {
  expect(validateRegisterForm({ ...validData, password, confirmPassword: password })).toEqual({
    password: message
  });
});

test.each([' ', '\t', '\n', '\u00a0', 'é', '中'])('%j does not count as a special character', character => {
  const password = `abcdef1${character}`;
  expect(validateRegisterForm({ ...validData, password, confirmPassword: password })).toEqual({
    password: 'Include at least one special character, such as ! or @, in your password.'
  });
});

test.each(['!', '_', '@', '€', '—'])('accepts punctuation or symbol %j', character => {
  const password = `abcdef1${character}`;
  expect(validateRegisterForm({ ...validData, password, confirmPassword: password })).toEqual({});
});

test('preserves password whitespace when checking length and equality', () => {
  const password = ' abcde1! ';
  expect(validateRegisterForm({ ...validData, password, confirmPassword: password })).toEqual({});
  expect(validateRegisterForm({ ...validData, password, confirmPassword: password.trim() })).toEqual({
    confirmPassword: 'Passwords must match.'
  });
  expect(validateRegisterForm({ ...validData, password: ' abcde1!', confirmPassword: ' abcde1!' })).toEqual({});
});

test('rejects mismatched confirmation', () => {
  expect(validateRegisterForm({ ...validData, confirmPassword: 'abcdef2!' })).toEqual({
    confirmPassword: 'Passwords must match.'
  });
});

test('requires terms acceptance independently', () => {
  expect(validateRegisterForm({ ...validData, acceptedTerms: false })).toEqual({
    acceptedTerms: 'Accept the terms to register.'
  });
});

test('validates trimmed email without mutating input or retaining previous errors', () => {
  const data = Object.freeze({ ...validData, email: ' person@example.com ', password: ' abcde1! ', confirmPassword: ' abcde1! ' });
  const original = { ...data };
  validateRegisterForm({ ...validData, email: '' });
  expect(validateRegisterForm(data)).toEqual({});
  expect(data).toEqual(original);
});

describe('evaluatePasswordStrength', () => {
  test('returns null level and 0% for empty password with all requirements unmet', () => {
    const result = evaluatePasswordStrength('');
    expect(result.level).toBeNull();
    expect(result.score).toBe(0);
    expect(result.percentage).toBe(0);
    expect(result.requirements.every(req => !req.met)).toBe(true);
  });

  test.each([
    ['abc', 'Weak', 1, 25, [false, false, false, false]],
    ['abcdefgh', 'Weak', 1, 25, [true, false, false, false]],
    ['abcdefg1', 'Fair', 2, 50, [true, false, true, false]],
    ['Abcdefgh', 'Fair', 2, 50, [true, true, false, false]],
    ['abcdef1!', 'Good', 3, 75, [true, false, true, true]],
    ['Abcdefg1', 'Good', 3, 75, [true, true, true, false]],
    ['Secret1!', 'Strong', 4, 100, [true, true, true, true]]
  ] as const)(
    'evaluates %j as %s (%i/4, %i%%)',
    (password, expectedLevel, expectedScore, expectedPercentage, expectedMet) => {
      const result = evaluatePasswordStrength(password);
      expect(result.level).toBe(expectedLevel);
      expect(result.score).toBe(expectedScore);
      expect(result.percentage).toBe(expectedPercentage);
      expect(result.requirements.map(r => r.met)).toEqual(expectedMet);
    }
  );
});

describe('form persistence helpers', () => {
  test('saves, loads, and clears form data in storage', () => {
    expect(loadRegisterFormData()).toEqual(DEFAULT_REGISTER_FORM_DATA);
    saveRegisterFormData(validData);
    expect(localStorage.getItem(REGISTER_FORM_STORAGE_KEY)).toBeTruthy();
    expect(loadRegisterFormData()).toEqual(validData);
    clearRegisterFormData();
    expect(loadRegisterFormData()).toEqual(DEFAULT_REGISTER_FORM_DATA);
  });

  test('falls back to defaults when stored JSON is malformed', () => {
    localStorage.setItem(REGISTER_FORM_STORAGE_KEY, '{invalid-json');
    expect(loadRegisterFormData()).toEqual(DEFAULT_REGISTER_FORM_DATA);
  });
});

describe('checkEmailAvailability', () => {
  test('resolves true for available email and false for taken email', async () => {
    await expect(checkEmailAvailability('newuser@example.com', 5)).resolves.toBe(true);
    await expect(checkEmailAvailability('taken@example.com', 5)).resolves.toBe(false);
    await expect(checkEmailAvailability('  ADMIN@example.com ', 5)).resolves.toBe(false);
  });
});
