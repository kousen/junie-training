import { z } from 'zod';
import { passwordPolicy } from './password';

export const registerSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Enter a valid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .refine(passwordPolicy, {
        message: 'Min 8 chars, include a number and a special character',
      }),
    confirmPassword: z.string().min(1, 'Confirm your password'),
    terms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
