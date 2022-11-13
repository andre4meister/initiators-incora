import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import ThemeProvider from 'hoc/ThemeProvider';
import GlobalModal from 'components/Modal/Modal';
import App from './App';
import store from './store/store';
import './styles/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
        <GlobalModal />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
