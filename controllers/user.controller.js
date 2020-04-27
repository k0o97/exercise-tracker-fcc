const User = require('../models/user.model');
const mongoose = require('mongoose');

module.exports.getUsers = async function (req, res, next) {
    try {
        var users = await User.find();
        // users.map(function(item) {
        //     item.log.map(function(exercise) {
        //       exercise.date = new Date(exercise.date).toDateString();
        //       return exercise;
        //     });
        //     return item;
        // });
        res.json(users);    
    } 
    catch (error) {
        next(error);
    }
};

module.exports.postNewUser = async function (req, res, next) {
    let username = req.body.username;
    
    // let user = await User.findOne({ username: username });
    // if (user) {
    //     return res.send('username already taken');
    // }
    
    // let newUser = new User({ username: username });
    // newUser.save(function (err, data) {
    //     if (err) {
    //         return res.send(err.message);
    //     }
    //     res.json({
    //         username: data.username,
    //         _id: data._id
    //     });
    // });  
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