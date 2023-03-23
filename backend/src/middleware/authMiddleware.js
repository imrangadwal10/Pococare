const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');


const authMiddleware = async (req, res, next) => {
    let token = req.headers.token;

    if (!token) {
        return res.status(401).send({ message: "Token not found" });
    }
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        const getuser = await userModel.findOne({_id:verify.id,email: verify.email });
        if (getuser) {
            next();
        } else {
            res.status(401).send({ message: "Invalid token" });
        }
    } catch (e) {
        res.status(401).send({ message: "Invalid token" });
    }
}

module.exports = authMiddleware;