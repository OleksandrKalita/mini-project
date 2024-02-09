const jwt = require('jsonwebtoken');
const config = require('config');
const Token = require("../models/Token");

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, config.get('accessTokenKey'), {expiresIn: '30s'});
        const refreshToken = jwt.sign(payload, config.get('refreshTokenKey'), {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken (userId, refreshToken) {
        const tokenData = await Token.findOne({user: userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await Token.create({user: userId, refreshToken});
        return token;
    }
    validateRefreshToken (refreshToken) {
        const userData = jwt.verify(refreshToken, config.get("refreshTokenKey"))
        return userData;
    }
    validateAccessToken (accessToken) {
        const userData = jwt.verify(accessToken, config.get("accessTokenKey"))
        return userData;
    }
    async refresh (refreshToken) {
        if (!refreshToken) {
            throw new Error('Token was not found')
        }

        const userData = this.validateRefreshToken(refreshToken);
        const tokenFromDb = await Token.findOne({user: userData.id});

        if (!userData || !tokenFromDb) {
            throw new Error("Invalid token!");
        }

        const payload = {id: userData.id}
        const tokens = this.generateTokens(payload);

        await this.saveToken(userData.id, tokens.refreshToken);

        return tokens;
    }
}

module.exports = new TokenService()