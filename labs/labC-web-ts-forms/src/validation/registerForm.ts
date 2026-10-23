export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}

export interface RegisterFormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  acceptedTerms?: string;
}

export type PasswordStrengthLevel = 'Weak' | 'Fair' | 'Good' | 'Strong';

export interface PasswordRequirement {
  id: 'length' | 'mixedCase' | 'number' | 'special';
  label: string;
  met: boolean;
}

export interface PasswordStrengthResult {
  level: PasswordStrengthLevel | null;
  score: 0 | 1 | 2 | 3 | 4;
  percentage: 0 | 25 | 50 | 75 | 100;
  requirements: PasswordRequirement[];
}

export const REGISTER_FORM_STORAGE_KEY = 'registerFormData';

export const DEFAULT_REGISTER_FORM_DATA: RegisterFormData = {
  email: '',
  password: '',
  confirmPassword: '',
  acceptedTerms: false
};

export const TAKEN_EMAILS = [
  'taken@example.com',
  'admin@example.com',
  'used@example.com'
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

export function evaluatePasswordStrength(password: string): PasswordStrengthResult {
  const requirements: PasswordRequirement[] = [
    {
      id: 'length',
      label: 'At least 8 characters',
      met: password.length >= 8
    },
    {
      id: 'mixedCase',
      label: 'Uppercase and lowercase letters',
      met: /[a-z]/.test(password) && /[A-Z]/.test(password)
    },
    {
      id: 'number',
      label: 'At least one number (0–9)',
      met: /[0-9]/.test(password)
    },
    {
      id: 'special',
      label: 'At least one special character',
      met: /[\p{P}\p{S}]/u.test(password)
    }
  ];

  if (!password) {
    return {
      level: null,
      score: 0,
      percentage: 0,
      requirements
    };
  }

  const metCount = requirements.filter(req => req.met).length;
  if (metCount <= 1) {
    return { level: 'Weak', score: 1, percentage: 25, requirements };
  }
  if (metCount === 2) {
    return { level: 'Fair', score: 2, percentage: 50, requirements };
  }
  if (metCount === 3) {
    return { level: 'Good', score: 3, percentage: 75, requirements };
  }
  return { level: 'Strong', score: 4, percentage: 100, requirements };
}

export function checkEmailAvailability(email: string, delayMs = 150): Promise<boolean> {
  const normalized = email.trim().toLowerCase();
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(!TAKEN_EMAILS.includes(normalized));
    }, delayMs);
  });
}

export function loadRegisterFormData(storage: Storage | undefined = globalThis.localStorage): RegisterFormData {
  try {
    const raw = storage?.getItem(REGISTER_FORM_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_REGISTER_FORM_DATA };
    const parsed = JSON.parse(raw) as Partial<RegisterFormData>;
    return {
      email: typeof parsed.email === 'string' ? parsed.email : '',
      password: typeof parsed.password === 'string' ? parsed.password : '',
      confirmPassword: typeof parsed.confirmPassword === 'string' ? parsed.confirmPassword : '',
      acceptedTerms: Boolean(parsed.acceptedTerms)
    };
  } catch {
    return { ...DEFAULT_REGISTER_FORM_DATA };
  }
}

export function saveRegisterFormData(
  data: RegisterFormData,
  storage: Storage | undefined = globalThis.localStorage
): void {
  try {
    storage?.setItem(REGISTER_FORM_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage quota or access errors
  }
}

export function clearRegisterFormData(storage: Storage | undefined = globalThis.localStorage): void {
  try {
    storage?.removeItem(REGISTER_FORM_STORAGE_KEY);
  } catch {
    // Ignore storage access errors
  }
}

export function validateRegisterForm(data: RegisterFormData): RegisterFormErrors {
  const errors: RegisterFormErrors = {};
  // Normalize only for validation; callers submit the trimmed email themselves.
  const email = data.email.trim();

  if (!email) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address, such as name@example.com.';
  }

  // Passwords remain unchanged. Numbers are 0–9; special characters are
  // Unicode punctuation or symbols, never whitespace or letters/numbers.
  if (!data.password) {
    errors.password = 'Password is required.';
  } else if (data.password.length < 8) {
    errors.password = 'Use at least 8 characters for your password.';
  } else if (!/[0-9]/.test(data.password)) {
    errors.password = 'Include at least one number (0–9) in your password.';
  } else if (!/[\p{P}\p{S}]/u.test(data.password)) {
    errors.password = 'Include at least one special character, such as ! or @, in your password.';
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'Confirm your password.';
  } else if (data.confirmPassword !== data.password) {
    errors.confirmPassword = 'Passwords must match.';
  }

  if (!data.acceptedTerms) {
    errors.acceptedTerms = 'Accept the terms to register.';
  }

  return errors;
}
