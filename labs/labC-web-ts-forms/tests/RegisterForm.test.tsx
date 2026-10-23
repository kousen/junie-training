import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { RegisterForm } from '../src/components/RegisterForm';
import { REGISTER_FORM_STORAGE_KEY } from '../src/validation/registerForm';

const getControls = () => ({
  email: screen.getByRole('textbox', { name: 'Email' }),
  password: screen.getByLabelText('Password', { exact: true }),
  confirmPassword: screen.getByLabelText('Confirm Password'),
  acceptedTerms: screen.getByRole('checkbox', { name: 'I accept the terms' }),
  submit: screen.getByRole('button', { name: 'Register' })
});

async function fillValid(user: ReturnType<typeof userEvent.setup>, password = 'Secret1!') {
  const controls = getControls();
  await user.type(controls.email, 'name@example.com');
  await user.type(controls.password, password);
  await user.type(controls.confirmPassword, password);
  await user.click(controls.acceptedTerms);
  return controls;
}

test('renders labelled required controls with hints and native semantics', () => {
  render(<RegisterForm />);
  const controls = getControls();
  expect(screen.getByRole('heading', { name: 'Create an account' })).toBeInTheDocument();
  expect(screen.getByRole('form', { name: 'Create an account' })).toHaveAttribute('novalidate');
  for (const control of [controls.email, controls.password, controls.confirmPassword, controls.acceptedTerms]) {
    expect(control).toBeRequired();
    expect(control).toHaveAttribute('aria-invalid', 'false');
    expect(control).toHaveAccessibleDescription();
    expect(control).not.toHaveAttribute('tabindex');
  }
  expect(controls.email).toHaveAttribute('type', 'email');
  expect(controls.email).toHaveAttribute('autocomplete', 'email');
  for (const control of [controls.password, controls.confirmPassword]) {
    expect(control).toHaveAttribute('type', 'password');
    expect(control).toHaveAttribute('autocomplete', 'new-password');
  }
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(screen.getByRole('status')).toBeEmptyDOMElement();
});

test('shows all required errors, describes invalid controls, and focuses email without invoking callback', async () => {
  const user = userEvent.setup();
  const onSubmit = jest.fn();
  render(<RegisterForm onSubmit={onSubmit} />);
  const controls = getControls();
  await user.click(controls.submit);
  expect(screen.getAllByRole('alert')).toHaveLength(1);
  const messages = [
    [controls.email, 'Email is required.'],
    [controls.password, 'Password is required.'],
    [controls.confirmPassword, 'Confirm your password.'],
    [controls.acceptedTerms, 'Accept the terms to register.']
  ] as const;
  for (const [control, message] of messages) {
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(control).toHaveAttribute('aria-invalid', 'true');
    expect(control).toHaveAccessibleDescription(expect.stringContaining(message));
  }
  expect(controls.email).toHaveFocus();
  expect(onSubmit).not.toHaveBeenCalled();
  expect(screen.getByRole('status')).toBeEmptyDOMElement();
});

test.each([
  ['short1!', 'Use at least 8 characters for your password.'],
  ['Password!', 'Include at least one number (0–9) in your password.'],
  ['Password1 ', 'Include at least one special character, such as ! or @, in your password.']
])('shows password rule for %s and focuses password', async (password, message) => {
  const user = userEvent.setup();
  render(<RegisterForm />);
  const controls = await fillValid(user, password);
  await user.click(controls.submit);
  expect(controls.password).toHaveFocus();
  expect(controls.password).toHaveAccessibleDescription(expect.stringContaining(message));
  expect(screen.getByRole('status')).toBeEmptyDOMElement();
});

test('revalidates corrections and dependent confirmation without changing the alert on each edit', async () => {
  const user = userEvent.setup();
  const onSubmit = jest.fn();
  render(<RegisterForm onSubmit={onSubmit} />);
  const controls = await fillValid(user);
  await user.clear(controls.email);
  await user.type(controls.email, 'invalid');
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  await user.click(controls.submit);
  expect(controls.email).toHaveFocus();
  expect(controls.email).toHaveAccessibleDescription(expect.stringContaining('Enter a valid email address'));
  const alert = screen.getByRole('alert');
  const summary = alert.textContent;
  await user.type(controls.password, '2');
  expect(screen.getByRole('alert')).toBe(alert);
  expect(alert.textContent).toBe(summary);
  expect(controls.confirmPassword).toHaveAccessibleDescription(expect.stringContaining('Passwords must match.'));
  await user.clear(controls.email);
  await user.type(controls.email, 'name@example.com');
  expect(controls.email).toHaveAttribute('aria-invalid', 'false');
  expect(controls.email).not.toHaveAccessibleDescription(expect.stringContaining('Enter a valid email address'));
  await user.click(controls.submit);
  expect(controls.confirmPassword).toHaveFocus();
  expect(onSubmit).not.toHaveBeenCalled();
  await user.type(controls.confirmPassword, '2');
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(screen.getByRole('status')).toBeEmptyDOMElement();
  await user.click(controls.submit);
  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('status')).toHaveTextContent('Registered!');
});

test('focuses unchecked terms after other controls are valid', async () => {
  const user = userEvent.setup();
  render(<RegisterForm />);
  const controls = await fillValid(user);
  await user.click(controls.acceptedTerms);
  await user.click(controls.submit);
  expect(controls.acceptedTerms).toHaveFocus();
  expect(controls.acceptedTerms).toHaveAttribute('aria-invalid', 'true');
  await user.keyboard(' ');
  expect(controls.acceptedTerms).toBeChecked();
  expect(controls.acceptedTerms).toHaveAttribute('aria-invalid', 'false');
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('submits normalized email and unchanged passwords exactly once per valid submission', async () => {
  const user = userEvent.setup();
  const onSubmit = jest.fn();
  render(<RegisterForm onSubmit={onSubmit} />);
  const controls = await fillValid(user, ' Secret1! ');
  await user.clear(controls.email);
  await user.type(controls.email, '  name@example.com  ');
  await user.click(controls.submit);
  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenLastCalledWith({
    email: 'name@example.com', password: ' Secret1! ', confirmPassword: ' Secret1! ', acceptedTerms: true
  });
  expect(screen.getByRole('status')).toHaveTextContent('Registered!');
  await user.click(controls.submit);
  expect(onSubmit).toHaveBeenCalledTimes(2);
});

test.each(['email', 'password', 'confirmPassword', 'acceptedTerms'] as const)(
  'clears success when %s changes without submitting again', async name => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<RegisterForm onSubmit={onSubmit} />);
    const controls = await fillValid(user);
    await user.click(controls.submit);
    expect(screen.getByRole('status')).toHaveTextContent('Registered!');
    if (name === 'acceptedTerms') await user.click(controls[name]);
    else await user.type(controls[name], 'x');
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
    expect(onSubmit).toHaveBeenCalledTimes(1);
  }
);

test('supports natural tab order, Space for terms, and Enter submission with callback', async () => {
  const user = userEvent.setup();
  const onSubmit = jest.fn();
  render(<RegisterForm onSubmit={onSubmit} />);
  const controls = getControls();
  await user.tab();
  expect(controls.email).toHaveFocus();
  await user.keyboard('name@example.com');
  await user.tab();
  expect(controls.password).toHaveFocus();
  await user.keyboard('Secret1!');
  await user.tab();
  expect(controls.confirmPassword).toHaveFocus();
  await user.keyboard('Secret1!');
  await user.tab();
  expect(controls.acceptedTerms).toHaveFocus();
  await user.keyboard(' ');
  expect(controls.acceptedTerms).toBeChecked();
  await user.tab();
  expect(controls.submit).toHaveFocus();
  await user.keyboard('{Enter}');
  expect(screen.getByRole('status')).toHaveTextContent('Registered!');
  expect(onSubmit).toHaveBeenCalledTimes(1);
  await user.tab({ shift: true });
  await user.tab({ shift: true });
  expect(controls.confirmPassword).toHaveFocus();
  await user.keyboard('{Enter}');
  expect(screen.getByRole('status')).toHaveTextContent('Registered!');
  expect(onSubmit).toHaveBeenCalledTimes(2);
});

test('shows success without props when valid data is submitted', async () => {
  const user = userEvent.setup();
  render(<RegisterForm />);
  const controls = await fillValid(user);
  await user.click(controls.submit);
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('Registered!');
});

describe('real-time password strength indicator', () => {
  test('updates strength levels (Weak, Fair, Good, Strong), progress bar, checkmarks, and aria-live region as user types', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);
    const { password } = getControls();
    const progressBar = screen.getByRole('progressbar', { name: 'Password strength' });
    const requirementsList = screen.getByRole('list', { name: 'Password requirements' });

    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
    expect(progressBar).toHaveAttribute('aria-valuetext', 'Empty');
    for (const item of within(requirementsList).getAllByRole('listitem')) {
      expect(item).toHaveTextContent(/^○/);
    }

    // Weak (1 requirement met: length >= 8)
    await user.type(password, 'abcdefgh');
    expect(progressBar).toHaveAttribute('aria-valuenow', '25');
    expect(progressBar).toHaveAttribute('aria-valuetext', 'Weak');
    const liveRegion = screen.getByText('Password strength: Weak');
    expect(liveRegion).toHaveAttribute('aria-live', 'polite');
    expect(within(requirementsList).getByText('At least 8 characters').closest('li')).toHaveTextContent('✓ At least 8 characters');
    expect(within(requirementsList).getByText('Uppercase and lowercase letters').closest('li')).toHaveTextContent('○ Uppercase and lowercase letters');

    // Fair (2 requirements met: length + uppercase/lowercase)
    await user.clear(password);
    await user.type(password, 'Abcdefgh');
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuetext', 'Fair');
    expect(screen.getByText('Password strength: Fair')).toHaveAttribute('aria-live', 'polite');
    expect(within(requirementsList).getByText('Uppercase and lowercase letters').closest('li')).toHaveTextContent('✓ Uppercase and lowercase letters');

    // Good (3 requirements met: length + uppercase/lowercase + number)
    await user.type(password, '1');
    expect(progressBar).toHaveAttribute('aria-valuenow', '75');
    expect(progressBar).toHaveAttribute('aria-valuetext', 'Good');
    expect(screen.getByText('Password strength: Good')).toHaveAttribute('aria-live', 'polite');
    expect(within(requirementsList).getByText('At least one number (0–9)').closest('li')).toHaveTextContent('✓ At least one number (0–9)');
    expect(within(requirementsList).getByText('At least one special character').closest('li')).toHaveTextContent('○ At least one special character');

    // Strong (4 requirements met: length + uppercase/lowercase + number + special)
    await user.type(password, '!');
    expect(progressBar).toHaveAttribute('aria-valuenow', '100');
    expect(progressBar).toHaveAttribute('aria-valuetext', 'Strong');
    expect(screen.getByText('Password strength: Strong')).toHaveAttribute('aria-live', 'polite');
    for (const item of within(requirementsList).getAllByRole('listitem')) {
      expect(item).toHaveTextContent(/^✓/);
    }
  });
});

describe('form persistence', () => {
  test('saves progress to localStorage and restores on page reload', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<RegisterForm />);
    const controls = getControls();

    await user.type(controls.email, 'saved@example.com');
    await user.type(controls.password, 'Secret1!');
    await user.type(controls.confirmPassword, 'Secret1!');
    await user.click(controls.acceptedTerms);

    const saved = JSON.parse(localStorage.getItem(REGISTER_FORM_STORAGE_KEY) ?? '{}');
    expect(saved).toEqual({
      email: 'saved@example.com',
      password: 'Secret1!',
      confirmPassword: 'Secret1!',
      acceptedTerms: true
    });

    // Simulate page reload by unmounting and mounting a fresh instance
    unmount();
    render(<RegisterForm />);
    const restored = getControls();
    expect(restored.email).toHaveValue('saved@example.com');
    expect(restored.password).toHaveValue('Secret1!');
    expect(restored.confirmPassword).toHaveValue('Secret1!');
    expect(restored.acceptedTerms).toBeChecked();
  });

  test('clears localStorage on successful submission', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<RegisterForm />);
    const controls = await fillValid(user);
    expect(localStorage.getItem(REGISTER_FORM_STORAGE_KEY)).not.toBeNull();

    await user.click(controls.submit);
    expect(screen.getByRole('status')).toHaveTextContent('Registered!');
    expect(localStorage.getItem(REGISTER_FORM_STORAGE_KEY)).toBeNull();

    unmount();
    render(<RegisterForm />);
    const fresh = getControls();
    expect(fresh.email).toHaveValue('');
    expect(fresh.password).toHaveValue('');
    expect(fresh.confirmPassword).toHaveValue('');
    expect(fresh.acceptedTerms).not.toBeChecked();
  });

  test('clears form fields, errors, and localStorage when "Clear form" button is clicked', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);
    const controls = getControls();
    const clearButton = screen.getByRole('button', { name: 'Clear form' });

    await user.type(controls.email, 'invalid-email');
    await user.type(controls.password, 'Secret1!');
    await user.click(controls.acceptedTerms);
    await user.click(controls.submit);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(localStorage.getItem(REGISTER_FORM_STORAGE_KEY)).not.toBeNull();

    await user.click(clearButton);
    expect(controls.email).toHaveValue('');
    expect(controls.password).toHaveValue('');
    expect(controls.confirmPassword).toHaveValue('');
    expect(controls.acceptedTerms).not.toBeChecked();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(localStorage.getItem(REGISTER_FORM_STORAGE_KEY)).toBeNull();
  });
});

describe('async email uniqueness check', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('debounces email input by 500ms, shows loading state, and displays available message', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    let resolveCheck!: (available: boolean) => void;
    const mockCheck = jest.fn(
      () => new Promise<boolean>(resolve => {
        resolveCheck = resolve;
      })
    );

    render(<RegisterForm checkEmailAvailability={mockCheck} />);
    const { email } = getControls();

    await user.type(email, 'unique@example.com');
    expect(mockCheck).not.toHaveBeenCalled();

    // Advance 499ms: still debouncing
    act(() => {
      jest.advanceTimersByTime(499);
    });
    expect(mockCheck).not.toHaveBeenCalled();
    expect(screen.queryByText('Checking email availability...')).not.toBeInTheDocument();

    // Advance 1ms to hit 500ms debounce threshold
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(mockCheck).toHaveBeenCalledTimes(1);
    expect(mockCheck).toHaveBeenCalledWith('unique@example.com');
    expect(screen.getByText('Checking email availability...')).toBeInTheDocument();

    // Resolve API call as available
    await act(async () => {
      resolveCheck(true);
    });
    expect(screen.queryByText('Checking email availability...')).not.toBeInTheDocument();
    expect(screen.getByText('Email is available.')).toBeInTheDocument();
    expect(email).toHaveAttribute('aria-invalid', 'false');
  });

  test('displays error message and blocks submission when mock API reports email is taken', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const mockCheck = jest.fn().mockResolvedValue(false);
    const onSubmit = jest.fn();

    render(<RegisterForm checkEmailAvailability={mockCheck} onSubmit={onSubmit} />);
    const controls = await fillValid(user);
    await user.clear(controls.email);
    await user.type(controls.email, 'taken@example.com');

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(screen.getByText('This email is already taken.')).toBeInTheDocument();
    });
    expect(controls.email).toHaveAttribute('aria-invalid', 'true');

    await user.click(controls.submit);
    expect(onSubmit).not.toHaveBeenCalled();
    expect(controls.email).toHaveFocus();
  });
});
