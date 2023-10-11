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
  let isHR = Math.random() > 0.9;
  let first = faker.person.firstName();
  let last = faker.person.lastName();
  
  return {
    password: faker.internet.password(),
    name: first + ' ' + last,
    role: isHR ? 'HR' : faker.person.jobTitle(),
    phone: faker.phone.number(),
    location: faker.location.state(),
    salary: faker.finance.amount(45000, 200000, 2, '$'),
    email: faker.internet.email({firstName: first, lastName: last}),
  }
};

export const Users = faker.helpers.multiple(createRandomUser, {
  count: 1000,
});
console.log(Users);