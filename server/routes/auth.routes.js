const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth.middleware");

const generateAccessToken = (id) => {
    const payload = {
        id,
    }
    return jwt.sign(payload, config.get("secretKey"), {expiresIn: "1h"});
}

router.post("/registration", async (req, res) => {
    try {
        const {firstName, lastName, email, dateOfBirthday, password} = req.body;

        const isUser = await User.findOne({email});

        if (isUser) {
            return res.status(409).json({message: `User with email: ${email} already exists. Try another one.`});
        }

        const hashedPassword = await bcrypt.hash(password, 7);

        const user = new User({firstName, lastName, email, dateOfBirthday, password: hashedPassword});

        await user.save();

        return res.status(201).json({message: "User has been created!"});
    } catch (e) {
        return res.status(500).json({message: "Server error: " + e});
    }
});

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).json({message: `User with email: ${email} not foud`});
        }

        const isValidPassword = bcrypt.compareSync(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({message: "Password is`t valid"});
        }

        const token = generateAccessToken(user._id);

        res.status(200).json({
            token,
            user,
        });
    } catch (e) {
        return res.status(500).json({message: "Server error: " + e});
    }
});

router.post("/auth", auth, async (req, res) => {
    try {
        const id = req.body.user.id;

        const user = await User.findOne({id});

        if (!user) return res.status(404).json({message: "User not found!"});
        
        const token = generateAccessToken(user._id);

        return res.json({
            token,
            user,
        });
    } catch (e) {
        return res.status(500).json({message: "Server error: " + e});
    }
})

module.exports = router;