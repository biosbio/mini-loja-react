import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // ou outro tema
import 'primereact/resources/primereact.min.css';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
