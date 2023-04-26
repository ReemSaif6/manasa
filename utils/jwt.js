const jwt = require('jsonwebtoken');

const jwtTokenExpirationTime = '10000h';

// secret key for signing JWT
const JWT_SECRET = '8d78871b129b9af8e32c0df8e6fb8aef986bb448';

// function to create a new JWT token
function createToken (payload){
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: jwtTokenExpirationTime,
        issuer: 'softDev',
        subject: '*'
    });

    return token;
}

// function to verify a JWT token
function verifyToken(token){
    try {
        return verify(token, JWT_SECRET);
    } catch (err) {
        throw err;
    }
}

module.exports = { createToken, verifyToken }
