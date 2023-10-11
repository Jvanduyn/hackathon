const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    PhoneNumber: {
        type: String,
        required: true,
    },
    Role: {
        type: String,
        required: true,
    },
    Location: {
        type: String,
        required: true,
    },
    Salary: {
        type: Number,
        required: true,
    },
    ReportsTo: {
        type: String,
        required: false,
    },
});


const User = mongoose.model('User', userSchema);

module.exports = { User }; 
