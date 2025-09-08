import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { RegisterForm } from '../src/components/RegisterForm';

test('shows error when fields are empty', async () => {
  render(<RegisterForm />);
  await userEvent.click(screen.getByRole('button', { name: /register/i }));
  expect(screen.getByRole('alert')).toHaveTextContent(/required/i);
});
