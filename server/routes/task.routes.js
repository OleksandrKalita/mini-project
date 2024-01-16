const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const Task = require("../models/Task");
const User = require("../models/User");

router.post("/create", auth, async (req, res) => {
    try {
        const {text, type, status, createDate, expiredDate} = req.body;
        const userId = req.body.user.id;

        const user = await User.findOne({_id: userId});

        if (!user) return res.status(404).json({message: `User not find. Token is invalid`});

        const task = new Task({
            userId,
            type,
            status,
            text,
            createDate,
            expiredDate,
        })
        await task.save();

        return res.json({message: `${type} has been created`});
    } catch (e) {
        return res.status(401).json({message: "Server error: " + e});
    }
})
router.post("/get", auth, async (req, res) => {
    try {
        const userId = req.body.user.id;

        const tasks = await Task.find({userId});

        return res.json({
            tasks,
        })
    } catch (e) {
        return res.status(401).json({message: "Server error: " + e});
    }
})
router.post("/update-status", auth, async (req, res) => {
    try {
        const {taskId, newStatus} = req.body;
        await Task.updateOne({_id: taskId}, {$set: {status: newStatus ? "done" : "pending"}})
        
    } catch (e) {
        return res.status(401).json({message: "Server error: " + e});
    }
})

module.exports = router;