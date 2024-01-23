const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const Task = require("../models/Task");
const User = require("../models/User");
const { validationResult, body } = require("express-validator");

router.post("/create", auth, 
    body("text").trim().isLength({min: 1, max: 50}).withMessage("Text field is incorrectly"),
    body("type").isIn(["task", "event"]).withMessage("Type field in incorrectly!"),
    body("status").isIn(["pending", "done"]).withMessage("Status field is incorrectly!"),
    body("createDate", "expiredDate").isDate().withMessage("Incorrect format for date fields!"),
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }


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
router.get("/get", auth, 
    body("user.id").isString().withMessage("User id is incorrectly!"),
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const userId = req.body.user.id;

        const tasks = await Task.find({userId});

        return res.json({
            tasks,
        })
    } catch (e) {
        return res.status(401).json({message: "Server error: " + e});
    }
})
router.post("/update-status", auth, 
    body("taskId").isString().withMessage("Incorrect taskId field!"),
    body("newStatus").isBoolean().withMessage("New status field is incorrectly!"),
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const {taskId, newStatus} = req.body;
        await Task.updateOne({_id: taskId}, {$set: {status: newStatus ? "done" : "pending"}})
        
        return res.json({
            message: "Status was changed!"
        })
    } catch (e) {
        return res.status(401).json({message: "Server error: " + e});
    }
})

module.exports = router;