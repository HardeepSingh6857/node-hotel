const { uniq } = require('lodash');
const mongoose = require('mongoose');

// Define Person Schema
const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'client'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true    
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    }
});

// Create Person Model
const Person = new mongoose.model('Person', PersonSchema);
module.exports = Person; 