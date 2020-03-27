const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
    //TODO: Get token from header
    const token = req.header("x-auth-token");

    //TODO:Check if not token
    if (!token) {
        return res.status(401).json({
            msg: "No token authorization denied"
        });
    }

    //TODO:Verify token
    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};
