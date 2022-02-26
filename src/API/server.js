const bodyParser = require("body-parser");
const express = require("express");
const server = express();
const cors = require('cors');
const mongoose = require('mongoose');
const authController = require("./controllers/authController.js");
const technologieController = require("./controllers/technologieController.js");
require('dotenv').config()

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}
server.use(cors(corsOptions));
server.use(bodyParser.json());

console.log(process.env);
mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected')
}).catch(err => console.log(err))


server.use('/', authController);
server.use('/', technologieController);

module.exports = server;

server.listen(4566, () => {
    console.log("Tech-Radar is running....");
});
