import React from 'react';
import ReactDOM from 'react-dom/client';
import { RegisterForm } from './components/RegisterForm';
import './App.css';

const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <RegisterForm />
    </React.StrictMode>
);