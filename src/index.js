import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import { faker } from '@faker-js/faker';
import { options } from './routes/api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const { faker } = require('@faker-js/faker');

export function createRandomUser(): User {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    name: faker.person.fullName(),
    role: faker.person.jobTitle(),
    phone: faker.phone.number(),
    location: faker.location.state(),
    salary: faker.finance.amount(45000, 200000, 2, '$')
  }
};