const User = require('../models/user.model');
const mongoose = require('mongoose');

module.exports.getUsers = async function (req, res) {
    try {
        var users = await User.find();
        users.map(function(item) {
            item.log.map(function(exercise) {
              exercise.date = exercise.date.toDateString();
              return exercise;
            });
            return item;
        });
        res.json(users);    
    } 
    catch (error) {
        res.send(error);
    }
};

module.exports.postNewUser = async function (req, res) {
    let username = req.body.username;
    
    let user = await User.findOne({ username: username });
    if (user) {
        return res.send('username already taken');
    }
    
    let newUser = new User({ username: username });
    newUser.save(function (err, data) {
        if (err) {
            return res.send(err.message);
        }
        res.json({
            username: data.username,
            _id: data._id
        });
    });  
};