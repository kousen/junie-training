import React, { useRef, useState } from 'react';

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

export interface RegisterFormProps {
  onSubmit?: (data: RegisterFormData) => void;
}

const initialFormData: RegisterFormData = {
  email: '',
  password: '',
  confirmPassword: '',
  acceptedTerms: false,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const numberPattern = /\d/;
const specialCharacterPattern = /[^A-Za-z0-9]/;

export function validateRegistrationForm(data: RegisterFormData): RegisterFormErrors {
  const errors: RegisterFormErrors = {};
  const email = data.email.trim();

  if (!email) {
    errors.email = 'Email is required.';
  } else if (!emailPattern.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!data.password) {
    errors.password = 'Password is required.';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  } else if (!numberPattern.test(data.password)) {
    errors.password = 'Password must include at least one number.';
  } else if (!specialCharacterPattern.test(data.password)) {
    errors.password = 'Password must include at least one special character.';
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'Confirm your password.';
  } else if (data.confirmPassword !== data.password) {
    errors.confirmPassword = 'Passwords must match.';
  }

  if (!data.acceptedTerms) {
    errors.acceptedTerms = 'You must accept the terms and conditions.';
  }

  return errors;
}

function hasErrors(errors: RegisterFormErrors) {
  return Object.keys(errors).length > 0;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterFormData>(initialFormData);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(current => ({ ...current, [name]: value }));
  };

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(current => ({ ...current, acceptedTerms: event.target.checked }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateRegistrationForm(formData);
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      setSubmitted(false);
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    setSubmitted(true);
    onSubmit?.({ ...formData, email: formData.email.trim() });
  };

  const errorMessages = Object.values(errors);

  return (
    <form onSubmit={handleSubmit} aria-label="Registration form" noValidate>
      <h2>Register</h2>

      {errorMessages.length > 0 && (
        <div
          ref={errorSummaryRef}
          role="alert"
          tabIndex={-1}
          aria-labelledby="registration-error-title"
        >
          <h3 id="registration-error-title">Please fix the following:</h3>
          <ul>
            {errorMessages.map(message => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleTextChange}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          autoComplete="email"
        />
        {errors.email && <p id="email-error">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleTextChange}
          aria-invalid={errors.password ? 'true' : 'false'}
          aria-describedby={errors.password ? 'password-error' : undefined}
          autoComplete="new-password"
        />
        {errors.password && <p id="password-error">{errors.password}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleTextChange}
          aria-invalid={errors.confirmPassword ? 'true' : 'false'}
          aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
          autoComplete="new-password"
        />
        {errors.confirmPassword && <p id="confirm-password-error">{errors.confirmPassword}</p>}
      </div>

      <div>
        <input
          id="acceptedTerms"
          name="acceptedTerms"
          type="checkbox"
          checked={formData.acceptedTerms}
          onChange={handleTermsChange}
          aria-invalid={errors.acceptedTerms ? 'true' : 'false'}
          aria-describedby={errors.acceptedTerms ? 'terms-error' : undefined}
        />
        <label htmlFor="acceptedTerms">I accept the terms and conditions</label>
        {errors.acceptedTerms && <p id="terms-error">{errors.acceptedTerms}</p>}
      </div>

      <button type="submit">Register</button>

      {submitted && <p role="status">Registration submitted.</p>}
    </form>
  );
}
