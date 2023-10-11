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
});

const employeeSchema = new mongoose.Schema({
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
        required: true
    }
})

const User = mongoose.model('User', userSchema);
const Employee = mongoos.model('Employee', employeeSchema)

module.exports = { User, Employee }; 
