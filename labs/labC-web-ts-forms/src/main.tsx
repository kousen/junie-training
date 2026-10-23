import React from 'react';
import { createRoot } from 'react-dom/client';
import { RegisterForm } from './components/RegisterForm';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RegisterForm />
  </React.StrictMode>,
);
