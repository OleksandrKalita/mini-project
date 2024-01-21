const {Schema, model} = require("mongoose");

const User = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    dateOfBirthday: {type: String, required: false},
    avatarId: {type: String, required: false},
    avatarUrl: {type: String, required: false},
    password: {type: String, required: true},
});

module.exports = model("User", User);