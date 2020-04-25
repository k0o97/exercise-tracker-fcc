const User = require('../models/user.model');
const mongoose = require('mongoose');

module.exports.getUsers = async function (req, res) {
    let users = await User.find();
    res.json(users);
};

module.exports.postNewUser = async function (req, res) {
    let username = req.body.username;
    let user = await User.findOne({ username: username });
    if (user) {
        return res.send('username already taken');
    }
    let newUser = new User({ username: username });
    newUser.save();
    res.json({ username: username, _id: newUser._id });
};