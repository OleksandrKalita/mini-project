const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const Task = require("../models/Task");

router.post("/create", auth, async (req, res) => {
    try {
        const {text, createDate, expiredDate} = req.body;
        const userId = req.body.user.id;

        const task = new Task({
            userId,
            text,
            createDate,
            expiredDate,
        })

        await task.save();

        return res.json({message: "Task has been created!"});


    } catch (e) {
        return res.status(401).json({message: "Server error: " + e});
    }
})

module.exports = router;