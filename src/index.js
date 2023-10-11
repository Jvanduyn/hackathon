import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import { faker } from '@faker-js/faker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export function createRandomUser() {
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

export const Users = faker.helpers.multiple(createRandomUser, {
  count: 1000,
});