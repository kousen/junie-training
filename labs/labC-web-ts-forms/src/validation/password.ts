// Pure password validation helpers. Keep these small and easily testable.
export const passwordHasMinLength = (s: string) => s.length >= 8;
export const passwordHasNumber = (s: string) => /\d/.test(s);
export const passwordHasSpecial = (s: string) => /[^A-Za-z0-9]/.test(s);

export const passwordPolicy = (s: string) =>
  passwordHasMinLength(s) && passwordHasNumber(s) && passwordHasSpecial(s);
