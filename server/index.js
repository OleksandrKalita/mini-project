const express = require("express");
const app = express();
const config = require("config");
const PORT = config.get("serverPort");
const mongoose = require("mongoose");
// const cors = require("./middleware/cors.middleware");
const authRouter = require("./routes/auth.routes");
const taskRouter = require("./routes/task.routes");
const userRouter = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser("eIOf39Kjc"));
app.use(cors({
    origin: 'http://localhost:3200', // Домен вашого реакт-додатку
    credentials: true, // Встановлюємо прапорець для дозволу передачі кук між доменами
  }));
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