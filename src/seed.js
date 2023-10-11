import { faker } from '@faker-js/faker';

const numManagers = 5;
const managers = [];
for (let x = 0; x < numManagers; x++) {
    let first = faker.person.firstName();
    let last = faker.person.lastName();
    managers[x] = {
        password: faker.internet.password(),
        name: first + ' ' + last,
        role: 'Manager',
        phone: faker.phone.number(),
        location: faker.location.state(),
        salary: faker.finance.amount(45000, 200000, 2, '$'),
        email: faker.internet.email({ firstName: first, lastName: last }),
    }
}
function createRandomUser() {
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
        email: faker.internet.email({ firstName: first, lastName: last }),
        manager: managers[faker.number.int(4)].email,
    }
};

export const Users = faker.helpers.multiple(createRandomUser, {
    count: 1000,
});
Users.push(...managers);
console.log(Users);