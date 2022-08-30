// user schema

const mongoose = require('mongoose');
const stringifyFunctionOperators = require('mongoose/lib/helpers/aggregate/stringifyFunctionOperators');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    googleId: {
        type: String,
        required: true
    },
    email: String,
    avatar: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);