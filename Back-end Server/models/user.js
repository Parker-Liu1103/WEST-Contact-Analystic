const mongoose = require("mongoose");
// const { stringify } = require("querystring");


const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: String,
    password: String
})

module.exports = mongoose.model('user', userSchema, 'users')