const jwt = require("jsonwebtoken");
const config = require("config");

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.header.authorizatio.split(" ")[1];

        if (!token) {
            return res.status(401).json({message: "User is't authorized!"});
        }

        const decodedData = jwt.verify(token, config.get("secretKey"));

        req.body.user = decodedData;
        next();
    } catch (e) {
        return res.status(403).json({message: "User is't authorized!"})
    }
}