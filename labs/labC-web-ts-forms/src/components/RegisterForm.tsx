import React, { useState } from 'react';

export function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError('All fields are required'); return;
    }
    if (password !== confirmPassword) {
      setError('Passwords must match'); return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <form onSubmit={onSubmit} aria-label="register-form">
      <label htmlFor="email">Email</label>
      <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      <button type="submit">Register</button>
      {error && <div role="alert">{error}</div>}
      {submitted && <div role="status">Registered!</div>}
    </form>
  );
}
