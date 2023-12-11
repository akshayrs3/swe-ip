import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// This is our entry point
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);