import React from 'react';
import { useForm } from 'react-hook-form';
import { isValidEmail, validatePassword } from '../utils/validation';

export type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

export function RegisterForm() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitSuccessful } } = useForm<RegisterFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: { email: '', password: '', confirmPassword: '', terms: false }
  });

  const passwordValue = watch('password');

  const onSubmit = () => {
    // Submission would go here; test just needs to see success message.
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-label="register-form" noValidate>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          aria-invalid={!!errors.email || undefined}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email', {
            required: 'Email is required',
            validate: (v) => isValidEmail(v) || 'Enter a valid email address'
          })}
        />
        {errors.email && (
          <div id="email-error" role="alert">{errors.email.message}</div>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          aria-invalid={!!errors.password || undefined}
          aria-describedby={errors.password ? 'password-error' : undefined}
          {...register('password', {
            validate: validatePassword
          })}
        />
        {errors.password && (
          <div id="password-error" role="alert">{errors.password.message}</div>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          aria-invalid={!!errors.confirmPassword || undefined}
          aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (v) => v === passwordValue || 'Passwords must match'
          })}
        />
        {errors.confirmPassword && (
          <div id="confirmPassword-error" role="alert">{errors.confirmPassword.message}</div>
        )}
      </div>

      <div>
        <input
          id="terms"
          type="checkbox"
          aria-invalid={!!errors.terms || undefined}
          aria-describedby={errors.terms ? 'terms-error' : undefined}
          {...register('terms', { required: 'You must accept the terms' })}
        />
        <label htmlFor="terms">I agree to the terms and conditions</label>
        {errors.terms && (
          <div id="terms-error" role="alert">{errors.terms.message}</div>
        )}
      </div>

      <button type="submit">Register</button>

      {isSubmitSuccessful && Object.keys(errors).length === 0 && (
        <div role="status">Registered!</div>
      )}
    </form>
  );
}
