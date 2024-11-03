import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './frontend/App'; // Adjust this path if App is located in a different folder
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
      <App />
    {/* </BrowserRouter> */}
  </React.StrictMode>
);

