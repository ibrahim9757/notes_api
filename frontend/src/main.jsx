import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
<h1 className="text-4xl font-bold text-red-600">Hello, Tailwind!</h1>