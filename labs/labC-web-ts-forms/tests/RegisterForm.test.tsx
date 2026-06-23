import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {
  RegisterForm,
  RegisterFormData,
  validateRegistrationForm,
} from '../src/components/RegisterForm';

const validFormData: RegisterFormData = {
  email: 'alex@example.com',
  password: 'Secure1!',
  confirmPassword: 'Secure1!',
  acceptedTerms: true,
};

describe('validateRegistrationForm', () => {
  test('returns errors for missing required fields', () => {
    expect(
      validateRegistrationForm({
        email: '',
        password: '',
        confirmPassword: '',
        acceptedTerms: false,
      }),
    ).toEqual({
      email: 'Email is required.',
      password: 'Password is required.',
      confirmPassword: 'Confirm your password.',
      acceptedTerms: 'You must accept the terms and conditions.',
    });
  });

  test('validates email, password rules, password match, and terms', () => {
    expect(
      validateRegistrationForm({
        email: 'not-an-email',
        password: 'password',
        confirmPassword: 'different',
        acceptedTerms: false,
      }),
    ).toEqual({
      email: 'Enter a valid email address.',
      password: 'Password must include at least one number.',
      confirmPassword: 'Passwords must match.',
      acceptedTerms: 'You must accept the terms and conditions.',
    });

    expect(
      validateRegistrationForm({
        ...validFormData,
        password: 'Password1',
        confirmPassword: 'Password1',
      }),
    ).toEqual({
      password: 'Password must include at least one special character.',
    });
  });

  test('returns no errors for valid data', () => {
    expect(validateRegistrationForm(validFormData)).toEqual({});
  });
});

describe('RegisterForm', () => {
  test('renders accessible form controls', () => {
    render(<RegisterForm />);

    expect(screen.getByRole('form', { name: /registration form/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toHaveAttribute('type', 'password');
    expect(screen.getByLabelText(/confirm password/i)).toHaveAttribute('type', 'password');
    expect(screen.getByRole('checkbox', { name: /terms and conditions/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('shows accessible validation errors on submit', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.click(screen.getByRole('button', { name: /register/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/email is required/i);
    expect(screen.getByRole('alert')).toHaveTextContent(/password is required/i);
    expect(screen.getByRole('alert')).toHaveTextContent(/confirm your password/i);
    expect(screen.getByRole('alert')).toHaveTextContent(/accept the terms/i);

    expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText(/^password$/i)).toHaveAttribute('aria-describedby', 'password-error');
    expect(screen.getByRole('checkbox', { name: /terms and conditions/i })).toHaveAttribute(
      'aria-describedby',
      'terms-error',
    );

    await waitFor(() => expect(screen.getByRole('alert')).toHaveFocus());
  });

  test('validates field-specific values before submitting', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<RegisterForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    await user.type(screen.getByLabelText(/^password$/i), 'Password1');
    await user.type(screen.getByLabelText(/confirm password/i), 'Password2!');
    await user.click(screen.getByRole('button', { name: /register/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/enter a valid email address/i);
    expect(screen.getByRole('alert')).toHaveTextContent(/special character/i);
    expect(screen.getByRole('alert')).toHaveTextContent(/passwords must match/i);
    expect(screen.getByRole('alert')).toHaveTextContent(/accept the terms/i);
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  test('submits valid form data', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<RegisterForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/email/i), '  alex@example.com  ');
    await user.type(screen.getByLabelText(/^password$/i), 'Secure1!');
    await user.type(screen.getByLabelText(/confirm password/i), 'Secure1!');
    await user.click(screen.getByRole('checkbox', { name: /terms and conditions/i }));
    await user.click(screen.getByRole('button', { name: /register/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'alex@example.com',
      password: 'Secure1!',
      confirmPassword: 'Secure1!',
      acceptedTerms: true,
    });
    expect(screen.getByRole('status')).toHaveTextContent(/registration submitted/i);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  test('supports keyboard navigation through form controls', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.tab();
    expect(screen.getByLabelText(/email/i)).toHaveFocus();

    await user.tab();
    expect(screen.getByLabelText(/^password$/i)).toHaveFocus();

    await user.tab();
    expect(screen.getByLabelText(/confirm password/i)).toHaveFocus();

    await user.tab();
    expect(screen.getByRole('checkbox', { name: /terms and conditions/i })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole('button', { name: /register/i })).toHaveFocus();
  });
});
