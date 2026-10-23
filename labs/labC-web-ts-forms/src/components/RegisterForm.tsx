import React, { useEffect, useId, useRef, useState } from 'react';
import * as registerValidation from '../validation/registerForm';
import {
  clearRegisterFormData,
  DEFAULT_REGISTER_FORM_DATA,
  isValidEmail,
  loadRegisterFormData,
  RegisterFormData,
  RegisterFormErrors,
  saveRegisterFormData,
  validateRegisterForm
} from '../validation/registerForm';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';

export interface RegisterFormProps {
  onSubmit?: (data: RegisterFormData) => void;
  checkEmailAvailability?: (email: string) => Promise<boolean>;
  emailDebounceMs?: number;
}

export type EmailAvailabilityStatus = 'idle' | 'checking' | 'available' | 'taken';

const fields = [
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', hint: 'Use an email address such as name@example.com.' },
  { name: 'password', label: 'Password', type: 'password', autoComplete: 'new-password', hint: 'Use at least 8 characters, including a number and a special character such as ! or @. Spaces do not count as special characters.' },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password', autoComplete: 'new-password', hint: 'Enter the same password again.' }
] as const;

export function RegisterForm(props: RegisterFormProps) {
  const id = useId();
  const controls = useRef<Partial<Record<keyof RegisterFormData, HTMLInputElement | null>>>({});
  const [data, setData] = useState<RegisterFormData>(() => loadRegisterFormData());
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailStatus, setEmailStatus] = useState<EmailAvailabilityStatus>('idle');
  const emailDebounceMs = props.emailDebounceMs ?? 500;

  useEffect(() => {
    const trimmedEmail = data.email.trim();
    if (!isValidEmail(trimmedEmail)) {
      setEmailStatus('idle');
      return;
    }

    let cancelled = false;
    const timerId = setTimeout(async () => {
      if (cancelled) return;
      setEmailStatus('checking');
      try {
        const checker = props.checkEmailAvailability ?? registerValidation.checkEmailAvailability;
        const available = await checker(trimmedEmail);
        if (!cancelled) {
          setEmailStatus(available ? 'available' : 'taken');
        }
      } catch {
        if (!cancelled) {
          setEmailStatus('idle');
        }
      }
    }, emailDebounceMs);

    return () => {
      cancelled = true;
      clearTimeout(timerId);
    };
  }, [data.email, props.checkEmailAvailability, emailDebounceMs]);

  const updateField = <K extends keyof RegisterFormData>(name: K, value: RegisterFormData[K]) => {
    const nextData = { ...data, [name]: value };
    setData(nextData);
    saveRegisterFormData(nextData);
    setSubmitted(false);
    if (name === 'email') {
      setEmailStatus('idle');
    }
    if (attempted) setErrors(validateRegisterForm(nextData));
  };

  const onClear = () => {
    setData({ ...DEFAULT_REGISTER_FORM_DATA });
    setErrors({});
    setAttempted(false);
    setSubmitted(false);
    setEmailStatus('idle');
    clearRegisterFormData();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    setSubmitted(false);
    const nextErrors = validateRegisterForm(data);
    if (!nextErrors.email && emailStatus === 'taken') {
      nextErrors.email = 'This email is already taken.';
    }
    setErrors(nextErrors);
    const firstInvalid = (['email', 'password', 'confirmPassword', 'acceptedTerms'] as const)
      .find(name => nextErrors[name]);
    if (firstInvalid) {
      controls.current[firstInvalid]?.focus();
      return;
    }
    clearRegisterFormData();
    props.onSubmit?.({ ...data, email: data.email.trim() });
    setSubmitted(true);
  };

  return (
    <section className="registration-card" aria-labelledby={`${id}-heading`}>
      <h1 id={`${id}-heading`}>Create an account</h1>
      <p className="form-intro">Try this registration demo. No account is created or credentials stored.</p>
      <form onSubmit={onSubmit} aria-labelledby={`${id}-heading`} noValidate>
        {Object.keys(errors).length > 0 && (
          <div className="form-alert" role="alert">Please correct the fields marked below before registering.</div>
        )}
        {fields.map(field => {
          const isEmail = field.name === 'email';
          const showEmailStatus = isEmail && emailStatus !== 'idle' && !errors.email;
          const isEmailTaken = isEmail && emailStatus === 'taken' && !errors.email;
          const describedBy = [
            `${id}-${field.name}-hint`,
            showEmailStatus ? `${id}-email-status` : '',
            errors[field.name] ? `${id}-${field.name}-error` : ''
          ].filter(Boolean).join(' ');

          return (
            <div className="form-field" key={field.name}>
              <label htmlFor={`${id}-${field.name}`}>{field.label}</label>
              <input
                id={`${id}-${field.name}`}
                name={field.name}
                ref={control => { controls.current[field.name] = control; }}
                type={field.type}
                autoComplete={field.autoComplete}
                required
                value={data[field.name]}
                onChange={e => updateField(field.name, e.target.value)}
                aria-invalid={Boolean(errors[field.name]) || isEmailTaken}
                aria-describedby={describedBy}
              />
              <p className="field-hint" id={`${id}-${field.name}-hint`}>{field.hint}</p>
              {showEmailStatus && emailStatus === 'checking' && (
                <p className="field-status email-checking" id={`${id}-email-status`} aria-live="polite">
                  Checking email availability...
                </p>
              )}
              {showEmailStatus && emailStatus === 'available' && (
                <p className="field-status email-available" id={`${id}-email-status`} aria-live="polite">
                  Email is available.
                </p>
              )}
              {showEmailStatus && emailStatus === 'taken' && (
                <p className="field-error email-taken" id={`${id}-email-status`} aria-live="polite">
                  This email is already taken.
                </p>
              )}
              {errors[field.name] && <p className="field-error" id={`${id}-${field.name}-error`}>{errors[field.name]}</p>}
              {field.name === 'password' && (
                <PasswordStrengthIndicator password={data.password} idPrefix={id} />
              )}
            </div>
          );
        })}
        <div className="form-field">
          <div className="terms-control">
            <input
              id={`${id}-acceptedTerms`}
              name="acceptedTerms"
              ref={control => { controls.current.acceptedTerms = control; }}
              type="checkbox"
              required
              checked={data.acceptedTerms}
              onChange={e => updateField('acceptedTerms', e.target.checked)}
              aria-invalid={Boolean(errors.acceptedTerms)}
              aria-describedby={`${id}-acceptedTerms-hint${errors.acceptedTerms ? ` ${id}-acceptedTerms-error` : ''}`}
            />
            <label htmlFor={`${id}-acceptedTerms`}>I accept the terms</label>
          </div>
          <p className="field-hint" id={`${id}-acceptedTerms-hint`}>Required for this client-side demonstration.</p>
          {errors.acceptedTerms && <p className="field-error" id={`${id}-acceptedTerms-error`}>{errors.acceptedTerms}</p>}
        </div>
        <div className="form-actions">
          <button type="submit">Register</button>
          <button type="button" className="button-secondary" onClick={onClear}>Clear form</button>
        </div>
        <div className="form-success" role="status">{submitted ? 'Registered!' : ''}</div>
      </form>
    </section>
  );
}
