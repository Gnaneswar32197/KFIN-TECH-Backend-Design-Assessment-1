const jwt = require('jsonwebtoken')
const secretKey = "fjnfaefn124545415"

function signJwt(payload) {

    try{
        const token = jwt.sign(payload, secretKey, {
            expiresIn: "15m"
        })
        return token;
    } catch (error) {
        console.log(error)
    }
}

function verifyJwt(token) {
    try {
        const payload = jwt.verify(token, secretKey)
        return payload;
    } catch (error) {
        return {status: 401, message: "Invalid Token", "error":0}
    }
}

module.exports = {
    signJwt, verifyJwt
}