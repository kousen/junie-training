import { isValidEmail, validatePassword } from '../src/utils/validation';

describe('validation helpers', () => {
  test('isValidEmail returns true for valid emails and false for invalid', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('bad')).toBe(false);
    expect(isValidEmail('user@')).toBe(false);
    expect(isValidEmail('user@example')).toBe(false);
  });

  test('validatePassword enforces rules', () => {
    expect(validatePassword('')).toMatch(/required/i);
    expect(validatePassword('short1!')).toMatch(/at least 8/i);
    expect(validatePassword('abcdefgh!')).toMatch(/one number/i);
    expect(validatePassword('abcdefg1')).toMatch(/special character/i);
    expect(validatePassword('GoodPass1!')).toBe(true);
  });
});
