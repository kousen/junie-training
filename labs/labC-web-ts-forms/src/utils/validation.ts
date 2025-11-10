// Pure validation helpers for forms. Keep these framework-agnostic for easy unit testing.

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return emailRegex.test(value);
}

export function validatePassword(value: string): true | string {
  if (!value) return 'Password is required';
  if (value.length < 8) return 'Password must be at least 8 characters';
  if (!/[0-9]/.test(value)) return 'Password must include at least one number';
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(value)) return 'Password must include at least one special character';
  return true;
}
