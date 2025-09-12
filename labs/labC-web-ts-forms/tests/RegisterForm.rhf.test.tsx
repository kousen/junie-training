import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegisterForm } from '../src/components/RegisterForm';

describe('RegisterForm (RHF + Zod)', () => {
  test('validates required fields and policies', async () => {
    render(<RegisterForm />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /register/i }));

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    expect(screen.getByText(/confirm your password/i)).toBeInTheDocument();
    expect(screen.getByText(/you must accept the terms/i)).toBeInTheDocument();
  });

  test('shows password policy error then succeeds', async () => {
    render(<RegisterForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), 'a@b.com');
    await user.type(screen.getByLabelText(/^password$/i), 'abcdefg'); // too weak
    await user.type(screen.getByLabelText(/confirm password/i), 'abcdefg');
    await user.click(screen.getByLabelText(/i accept the terms/i));
    await user.click(screen.getByRole('button', { name: /register/i }));

    expect(
      screen.getByText(/at least 8 characters, include a number and a special/i)
    ).toBeInTheDocument();

    await user.clear(screen.getByLabelText(/^password$/i));
    await user.type(screen.getByLabelText(/^password$/i), 'Abcdefg1!');
    await user.clear(screen.getByLabelText(/confirm password/i));
    await user.type(screen.getByLabelText(/confirm password/i), 'Abcdefg1!');
    await user.click(screen.getByRole('button', { name: /register/i }));

    expect(screen.getByRole('status')).toHaveTextContent(/registered!/i);
  });

  test('mismatched passwords', async () => {
    render(<RegisterForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), 'a@b.com');
    await user.type(screen.getByLabelText(/^password$/i), 'Abcdefg1!');
    await user.type(screen.getByLabelText(/confirm password/i), 'Abcdefg2!');
    await user.click(screen.getByLabelText(/i accept the terms/i));
    await user.click(screen.getByRole('button', { name: /register/i }));

    expect(screen.getByText(/passwords must match/i)).toBeInTheDocument();
    const confirm = screen.getByLabelText(/confirm password/i);
    expect(confirm).toHaveAttribute('aria-invalid', 'true');
  });
});
