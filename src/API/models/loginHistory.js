const mongoose = require("mongoose");
var date = new Date();
const dateTimeStamp = date.toLocaleDateString() + " " + date.toLocaleTimeString();

const LoginHistory = mongoose.model(
    "Login History",
    new mongoose.Schema({
        username: String,
        loginDate: {type: String, default: dateTimeStamp}
    })
);
module.exports = LoginHistory;
