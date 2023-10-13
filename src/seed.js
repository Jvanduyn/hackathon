const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');

// mongodb client driver
const { MongoClient } = require('mongodb');

// DB Connection URL
var url = "mongodb://localhost:27017";

// Create client
const client = new MongoClient(url);

// Database and collection variables
const dbName = "database";
const collectionName = "users"
// connect to the db server
client.connect();

// set the database to use
const db = client.db(dbName);
// set the collection to use
const collection = db.collection(collectionName);


// Photos: 
// https://randomuser.me/api/portraits/<gender>/<id>.jpg
// where gender is “men” or “women”
// and  id is between 1 and 99



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
        salary: parseInt(faker.finance.amount(120000, 150000, 0)),
        email: faker.internet.email({ firstName: first, lastName: last }),
    }
}
function createRandomUser() {
    let first = faker.person.firstName();
    let last = faker.person.lastName();
    let jobs = {
        'Developer':1.5, 'HR':1.2, 'Designer':1, 'Facilitator':0.8, 'Director':1.5, 'Representative':0.7,
        'Technician':0.7, 'Assistant':0.5, 'Consultant':0.85, 'Executive':1.7, 'Associate':1.3, 'Architect':1.1,
        'Specialist':0.9, 'Engineer':1.1, 'Producer':0.85, 'Liaison':1.1, 'Analyst':1.1, 'Supervisor':1.1,
        'Officer':1.6, 'Strategist':1.12, 'Orchestrator':0.9, 'Planner':0.6, 'Agent':0.7,
        'Administrator':0.95, 'Coordinator':0.65}

        let job = Object.keys(jobs)[Math.floor(Math.random()*Object.keys(jobs).length)]
        let salary = Math.floor(100000 * jobs[job] + Math.floor(Math.random()*25000));
    return {
        password: faker.internet.password(),
        name: first + ' ' + last,
        role: job,
        phone: faker.phone.number(),
        location: faker.location.state(),
        salary: salary,
        email: faker.internet.email({ firstName: first, lastName: last }),
        manager: managers[faker.number.int(4)].email,
    }
};

const Users = faker.helpers.multiple(createRandomUser, {
    count: 5000,
});
Users.push(...managers);
// console.log(Users);

// Clear and insert new data
const clearAndInsertUsers = async (usersData) => {
    try {
        await collection.deleteMany({});
        console.log('Deleted existing users.');

        const users = await collection.insertMany(usersData);
        console.log('Users inserted successfully:');
        client.close();
    } catch (error) {
        console.error('Error:', error);
        client.close();
    }
};


clearAndInsertUsers(Users);