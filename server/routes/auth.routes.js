const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth.middleware");
const { validationResult, body } = require("express-validator");
const userController = require("../controllers/user-controller");
const tokenService = require("../service/token-service");

router.post("/registration", 
    body("firstName").notEmpty(),
    body("lastName").notEmpty(),
    body("email").isEmail().withMessage('Not a valid e-mail address'),
    body("email").custom(async (value) => {
        const user = await User.findOne({email: value});
        if (user) {
            throw new Error("E-mail already in use");
        }
    }),
    body("password").isLength({min: 7, max: 13}),
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const {firstName, lastName, email, dateOfBirthday, password} = req.body;

        const isUser = await User.findOne({email});

        if (isUser) {
            return res.status(409).json({message: `User with email: ${email} already exists. Try another one.`});
        }

        const hashedPassword = await bcrypt.hash(password, 7);

        const user = new User({
            firstName,
            lastName,
            email,
            dateOfBirthday: dateOfBirthday || null,
            password: hashedPassword,
            avatarId: null,
            avatarUrl: null,
        });

        await user.save();

        return res.status(201).json({message: "User has been created!"});
    } catch (e) {
        return res.status(500).json({message: "Server error: " + e});
    }
});

router.post("/login", 
    body("email").isEmail().withMessage('Not a valid e-mail address'),
    body("email").custom(async (value) => {
        const user = await User.findOne({email: value});
        if (!user) {
            throw new Error("Not find user with email!");
        }
    }),
    body("password").isLength({min: 7, max: 13}),
    userController.login
);

router.post("/auth",
    auth, 
    async (req, res) => {
    try {
        const id = req.body.user.id;
        
        const user = await User.findOne({_id: id});

        if (!user) return res.status(401).json({message: "User not found!"});

        return res.json({
            user,
        });
    } catch (e) {
        return res.status(500).json({message: "Server error: " + e});
    }
})

router.post("/refresh", userController.refresh);


module.exports = router;