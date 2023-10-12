import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';

const info = fetch(`http://localhost:3001/api/logininfo`);
info.then(res => res.json()).then(data => {
  console.log('Manager: \n', '\tEmail: ' + data.man.email, '\tPassword: ' + data.man.password,
  '\nHR: \n', '\tEmail: ' + data.hr.email, '\tPassword: ' + data.hr.password,
  '\nEmployee: \n', '\tEmail: ' + data.emp.email, '\tPassword: ' + data.emp.password)
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter><App /></BrowserRouter>
  </React.StrictMode>
);