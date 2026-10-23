import React from 'react';
import { evaluatePasswordStrength } from '../validation/registerForm';

export interface PasswordStrengthIndicatorProps {
  password: string;
  idPrefix: string;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
  idPrefix
}) => {
  const strength = evaluatePasswordStrength(password);

  return (
    <div className="password-strength" id={`${idPrefix}-password-strength`}>
      <div
        role="progressbar"
        aria-label="Password strength"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={strength.percentage}
        aria-valuetext={strength.level ?? 'Empty'}
        className="password-strength-bar"
      >
        <div
          className={`password-strength-fill${strength.level ? ` strength-${strength.level.toLowerCase()}` : ''}`}
          style={{ width: `${strength.percentage}%` }}
        />
      </div>
      <p
        className="password-strength-label"
        aria-live="polite"
        aria-atomic="true"
      >
        {strength.level ? `Password strength: ${strength.level}` : ''}
      </p>
      <ul className="password-requirements" aria-label="Password requirements">
        {strength.requirements.map(req => (
          <li
            key={req.id}
            className={`requirement-item ${req.met ? 'requirement-met' : 'requirement-unmet'}`}
            data-met={req.met}
          >
            <span className="requirement-icon" aria-hidden="true">
              {req.met ? '✓' : '○'}
            </span>{' '}
            <span>{req.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
