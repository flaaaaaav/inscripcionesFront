import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './auth';
import './index.css';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import Requeriments from './components/requeriments';
import Training from './components/training';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <App />
          <Requeriments />
          <Training />
        </ThemeProvider>
      </AuthProvider>
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}
