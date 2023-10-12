// mongodb client driver
const { MongoClient } = require('mongodb');

// DB Connection URL
var url = "mongodb://localhost:27017";

// Database and collection variables
const dbName = "database";
const collectionName = "users"

module.exports.call = async function call(operation, parameters, callback) {
    // Create client
    const client = new MongoClient(url);
    // connect to the db server
    await client.connect();

    // set the database to use
    const db = client.db(dbName);
    // set the collection to use
    const collection = db.collection(collectionName);

    //Execute Operations
    switch (operation) {
        case 'clearUsers':
            await collection.deleteMany({}).then(
                (result) => { callback({ status: "book records have been removed." }) },
                (reason) => { callback({ status: "error removing book records." }) }
            );
            break;

        case 'findallUsers':
            const users = await collection.find({}).toArray();
            callback({ users: users });
            break;

        case 'findUser':
            const user = await collection.findOne({ email: parameters.email, password: parameters.password });
            callback({ user: user });
            break;

        case 'findHR':
            const hr = await collection.findOne({ role: 'HR' });
            callback({ hr: hr });
            break;

        case 'findManager':
            const man = await collection.findOne({ role: 'Manager' });
            callback({ man: man });
            break;

        case 'findEmp':
            const emp = await collection.findOne({role: {$nin: ['Manager', 'HR']}});
            callback({ emp: emp });
            break;

        default:
            break;
    }
    console.log('call complete: ' + operation);
    client.close();
    return 'call complete';
}

