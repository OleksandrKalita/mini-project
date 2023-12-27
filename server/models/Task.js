const {Schema, model} = require("mongoose");

const Task = new Schema({
    userId: {type: String, required: true},
    text: {type: String, required: true},
    postDate: {type: String, required: true},
    expiredDate: {type: String, required: true},
});

module.exports = model("Task", Task);