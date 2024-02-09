const tokenService = require("../service/token-service");

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({message: "Unauthorized error!"});
            // return res.redirect("http://localhost:3201/api/auth/refresh");
        }

        const userData = tokenService.validateAccessToken(token);
        if (!userData) {
            return res.status(401).json({message: "Unauthorized error!"})
            // return res.redirect("http://localhost:3201/api/auth/refresh");
        }

        req.body.user = userData;
        next();
    } catch (e) {
        return res.status(401).json({message: "Unauthorized error!"+ e})
        // return res.redirect("http://localhost:3201/api/auth/refresh");
    }
}

module.exports = authMiddleware;