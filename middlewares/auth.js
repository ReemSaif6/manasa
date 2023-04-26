const jwt = require('../utils/jwt');
const express = require('express');

module.exports = (req = express.request, res = express.response, next) => {

    const bearerToken = req.header('Authorization');

    if(!bearerToken) return res.status(401).json(`The Token is not found`);
    
    const token = bearerToken.split(' ')[1];

    if (token) {
        try {
            const decodeJwt = jwt.verifyToken(token);
            res.locals.userId = decodeJwt.userId;
            return next();
        } catch (e) {
            return res.status(401).json({ errors: 'The token not valid !' });
        }
    } else res.status(401).json(`The Token is not found`);

};
