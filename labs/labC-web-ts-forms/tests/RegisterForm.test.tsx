import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { RegisterForm } from '../src/components/RegisterForm';

function setup() {
  render(<RegisterForm />);
}

async function fillValidForm({ email = 'user@example.com', password = 'Password1!', confirm = 'Password1!', checkTerms = true } = {}) {
  await userEvent.type(screen.getByLabelText(/email/i), email);
  await userEvent.type(screen.getByLabelText(/^password$/i), password);
  await userEvent.type(screen.getByLabelText(/confirm password/i), confirm);
  if (checkTerms) {
    await userEvent.click(screen.getByLabelText(/terms/i));
  }
}

test('shows required errors when submitting empty form', async () => {
  setup();
  await userEvent.click(screen.getByRole('button', { name: /register/i }));
  expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  expect(screen.getByText(/please confirm your password/i)).toBeInTheDocument();
  expect(screen.getByText(/you must accept the terms/i)).toBeInTheDocument();
});

test('email must be valid', async () => {
  setup();
  await fillValidForm({ email: 'not-an-email' });
  await userEvent.click(screen.getByRole('button', { name: /register/i }));
  expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
});

test('password must meet complexity rules', async () => {
  setup();
  await fillValidForm({ password: 'abcde123', confirm: 'abcde123' }); // no special char and < 8? actually 8 long but no special
  await userEvent.click(screen.getByRole('button', { name: /register/i }));
  expect(screen.getByText(/special character/i)).toBeInTheDocument();
});

test('confirm password must match', async () => {
  setup();
  await fillValidForm({ password: 'Password1!', confirm: 'Password2!' });
  await userEvent.click(screen.getByRole('button', { name: /register/i }));
  expect(screen.getByText(/passwords must match/i)).toBeInTheDocument();
});

test('terms must be accepted', async () => {
  setup();
  await fillValidForm({ checkTerms: false });
  await userEvent.click(screen.getByRole('button', { name: /register/i }));
  expect(screen.getByText(/must accept the terms/i)).toBeInTheDocument();
});

test('successful registration shows status message', async () => {
  setup();
  await fillValidForm();
  await userEvent.click(screen.getByRole('button', { name: /register/i }));
  expect(screen.getByRole('status')).toHaveTextContent(/registered!/i);
});
