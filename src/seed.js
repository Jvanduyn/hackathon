const { faker } = require('@faker-js/faker');
const { User } = require('./models/User');

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
        salary: parseFloat(faker.finance.amount(45000, 200000, 2)),
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
        salary: parseFloat(faker.finance.amount(45000, 200000, 2)),
        email: faker.internet.email({ firstName: first, lastName: last }),
        manager: managers[faker.number.int(4)].email,
    }
};

const Users = faker.helpers.multiple(createRandomUser, {
    count: 1000,
});
Users.push(...managers);
// console.log(Users);

// Clear and insert new data
const clearAndInsertUsers = async (usersData) => {
    try {
      await User.deleteMany({});
      console.log('Deleted existing users.');
  
      const users = await User.insertMany(usersData);
      console.log('Users inserted successfully:', users);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  clearAndInsertUsers(Users);