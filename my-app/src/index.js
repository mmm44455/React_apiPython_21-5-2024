import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './accset/App.css';
import reportWebVitals from './reportWebVitals';
import AppRouter from './router/AppRouter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppRouter/>
  // <ClassComponet name = "Duy Cao"/>
);


reportWebVitals();
