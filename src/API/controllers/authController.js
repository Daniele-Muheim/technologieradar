const express = require("express");
const server = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../helpers/config");
const LoginHistory = require("../models/loginHistory");
const User = require("../models/user");

server.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, async (err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (user) {
                const validPass = await bcrypt.compare(req.body.password, user.password);
                if (!validPass) {
                    return res.status(401).send("Email or Password is wrong");
                }

                let payload = { id: user._id, email: user.email, role: user.role };
                const token = jwt.sign(payload, config.secret, {
                    expiresIn: '20m'
                });

                const newLoginHistory = new LoginHistory({
                    username: req.body.email
                });
                const result = await LoginHistory.create(newLoginHistory);

                res.status(200).send({ 'token': token });
            }
            else {
                res.status(401).send('Invalid mobile')
            }

        }
    })
});

module.exports = server;

