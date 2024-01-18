const express = require("express");
const app = express();
const config = require("config");
const PORT = config.get("serverPort");
const mongoose = require("mongoose");
const cors = require("./middleware/cors.middleware");
const authRouter = require("./routes/auth.routes");
const taskRouter = require("./routes/task.routes");
const userRouter = require("./routes/user.routes");

app.use(cors);
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter)
app.use("/api/user", userRouter);

const start = async () => {
    try {
        await mongoose.connect(config.get("dbUrl"));

        app.listen(PORT, () => {
            console.log("Server has been started on PORT=" + PORT);
        })
    } catch (e) {
        console.log("Server error - " + e);
    }
}


start();