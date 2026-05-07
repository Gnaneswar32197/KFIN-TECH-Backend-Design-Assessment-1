const { invalidTokens } = require("../models/investorModel")
const { verifyJwt } = require("./authManager")

const checkAccess = (req, res, next) => {

    try {

        if (!req.user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        next();

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Middleware Error",
            error: error.message
        });
    }
};

module.exports = {
    checkAccess
};