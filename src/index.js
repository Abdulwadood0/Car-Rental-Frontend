import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./utils/i18n.js";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { CircularProgress, Box, Typography } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.Suspense
  >
    <Provider store={store}>
      <App />
    </Provider>

  </React.Suspense>
);


