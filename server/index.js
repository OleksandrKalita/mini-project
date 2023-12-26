const express = require("express");
const app = express();
const config = require("config");
const PORT = config.get("serverPort");
const mongoose = require("mongoose");

const start = async () => {
    try {
        await mongoose.connect(config.get("dbUrl"));

        app.listen(PORT, () => {
            console.log("Server has been started on PORT=" + PORT);
        })
    } catch (e) {

    }
}


start();