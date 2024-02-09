const tokenService = require("../service/token-service");
const userService = require("../service/user-service");
const { validationResult} = require("express-validator");


class UserController {
    async registration (req, res, next) {

    }
    async login (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            const {email, password} = req.body;
    
            const userData = await userService.login(email, password);
            
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 1000 * 24 * 24,
                httpOnly: true
            });

            return res.status(200).json(userData);
        } catch (e) {
            return res.status(500).json({message: "Server error: " + e});
        }
    } 
    async refresh (req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;

            const tokens = await tokenService.refresh(refreshToken);

            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.status(200).json(tokens);

        } catch (e) {
            return res.status(500).json({message: "Server error: " + e});
        }
    }
}

module.exports = new UserController();