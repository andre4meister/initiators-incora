import React from 'react';
import ReactDOM from 'react-dom/client';
import Calendar from 'components/UI/Calendar/Calendar';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App Calendar={Calendar} />
  </React.StrictMode>,
);
