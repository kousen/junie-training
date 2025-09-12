import { passwordHasMinLength, passwordHasNumber, passwordHasSpecial, passwordPolicy } from '../src/validation/password';

test('password rules', () => {
  expect(passwordHasMinLength('12345678')).toBe(true);
  expect(passwordHasNumber('abc1')).toBe(true);
  expect(passwordHasSpecial('abc!')).toBe(true);
  expect(passwordPolicy('Abcdefg1!')).toBe(true);
  expect(passwordPolicy('short')).toBe(false);
});
