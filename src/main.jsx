// Importing required modules and components
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './Context';
// Importing CSS stylesheets
import './css/global.css';
import './css/header.css';
import './css/createnote.css';
import './css/notes.css';
import './css/viewnote.css';
import './css/editnote.css';
import './css/warning.css';
import './css/save.css';

// Rendering the app inside the root element
ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrapping the app inside AppProvider for providing state and context to all components
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
