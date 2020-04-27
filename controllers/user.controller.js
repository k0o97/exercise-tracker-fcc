const User = require('../models/user.model');
const mongoose = require('mongoose');

module.exports.getUsers = async function (req, res, next) {
    try {
        var users = await User.find();
        let data = users.map(function(user) {
            return {
                _id: user._id,
                username: user.username,
                __v: user.__v
            };
        })
        res.json(data);
    } 
    catch (error) {
        next(error);
    }
};

module.exports.postNewUser = async function (req, res, next) {
    let username = req.body.username;
      
    try {
        let user = new User({username: username});
        let data = await user.save();
        res.json({
            username: data.username,
            _id: data._id
        });    
    } 
    catch (error) {
        next(error);
    }
};