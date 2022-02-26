let jwt = require('jsonwebtoken');
const config = require('./config.js');

let verifiedToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).send("Access Denied / Unauthorized request");
    }

    try {
        token = token.split(' ')[1]
        if (token === 'null' || !token) {
            return res.status(401).send('Unauthorized request');
        }

        let payload = jwt.verify(token, config.secret);
        if (!payload) {
            return res.status(401).send('Unauthorized request')
        }

        req.userID = payload.id
        next()

    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}

module.exports = {
    checkToken: verifiedToken
};
