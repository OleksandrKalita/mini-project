const User = require("../models/User");
const tokenService = require("../service/token-service");
const bcrypt = require("bcrypt");


class UserService {
    async registration () {

    }
    async login (email, password) {
        const user = await User.findOne({email});
    
        if (!user) {
            throw new Error(`User with email: ${email} not foud`); // 404
        }
    
        const isValidPassword = bcrypt.compareSync(password, user.password);
    
        if (!isValidPassword) {
            throw new Error('Password is`t valid'); // 401
        }
        
        const payload = {id: user._id}
        const tokens = tokenService.generateTokens(payload);
        
        await tokenService.saveToken(user._id, tokens.refreshToken);

        return {
            ...tokens,
            user,
        }
    }
}

module.exports = new UserService();