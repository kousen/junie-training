import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterSchema } from '../validation/schema';

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: RegisterSchema) => {
    // Replace with API call if needed
    console.log('Registered', data);
  };

  return (
    <div className="card" role="region" aria-label="Registration">
      <div className="header">
        <h1>Create your account</h1>
        <p>It only takes a minute.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} aria-label="Registration form" className="form-grid">
        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email || undefined}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            aria-invalid={!!errors.password || undefined}
            aria-describedby={errors.password ? 'password-error' : 'password-help'}
            {...register('password')}
          />
          {!errors.password && (
            <small id="password-help">
              At least 8 characters, include a number and a special character.
            </small>
          )}
          {errors.password && (
            <p id="password-error" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword || undefined}
            aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p id="confirmPassword-error" role="alert">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="checkbox-row">
          <input
            id="terms"
            type="checkbox"
            aria-invalid={!!errors.terms || undefined}
            aria-describedby={errors.terms ? 'terms-error' : undefined}
            {...register('terms')}
          />
          <div>
            <label htmlFor="terms">I accept the Terms and Conditions</label>
            {errors.terms && (
              <p id="terms-error" role="alert">
                {errors.terms.message}
              </p>
            )}
          </div>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting…' : 'Register'}
        </button>

        <div aria-live="polite" role="status">
          {isSubmitSuccessful && 'Registered!'}
        </div>
      </form>

      <div className="footer-note" aria-hidden="true">
        By registering you agree to our terms of service.
      </div>
    </div>
  );
}
