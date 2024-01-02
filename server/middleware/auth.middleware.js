const jwt = require("jsonwebtoken");
const config = require("config");

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({message: "User is't authorized!"});
        }

        const decodedData = jwt.verify(token, config.get("secretKey"));

        req.body.user = decodedData;
        next();
    } catch (e) {
        return res.status(403).json({message: "Authorized error! "+ e})
    }
}

module.exports = authMiddleware;