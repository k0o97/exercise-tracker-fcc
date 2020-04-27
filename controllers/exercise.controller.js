const User = require('../models/user.model');
const mongoose = require('mongoose');

function handlerDay(str, value = 0) {
    let date = new Date(str);
    if (date.toDateString() === 'Invalid Date') {
        return value;
    }
    return str;
}

module.exports.postAdd = async function (req, res, next) {
    try {
        let userId = req.body.userId;
        let description = req.body.description;
        let duration = req.body.duration;
        let date = Number(req.body.date) ? Number(req.body.date) : req.body.date || 0;
       
        let user = await User.findOne({ _id: userId});
        let userId = req.body.userId;
        let description = req.body.description;
        let duration = req.body.duration;
        let date = Number(req.body.date) ? Number(req.body.date) : req.body.date || 0;
       
        let user = await User.findOne({ _id: userId});
        if (!user) {
            return res.send('unknown _id');
        } 
        let exercise = {
            description: description,
            duration: duration,
            date: date
        };
        user.log.push(exercise);
        let exercise = {
            description: description,
            duration: duration,
            date: date
        };
        user.log.push(exercise);
        let data =  await user.save();
        res.json(data);
    } 
    catch (error) {
        next(error);
    }
    
};

module.exports.getLog = async function (req, res) {
    let userId = req.query.userId || "";
    let from = handlerDay(req.query.from);
    let to = handlerDay(req.query.to, '2050-01-01');
    let limit = req.query.limit || 0;
    if (!userId) {
        return res.send('Unknown userId');
    }
   
    let user = await User.findOne({ _id: userId });
    if (!user) {
      res.send('unknown userId');
    }
    let exercises = user.log.filter(function (exercise) {
        return exercise.date >= new Date(from) && exercise.date <= new Date(to); 
    }).sort(function (a, b) {
      return b.date - a.date;
    });

    res.json({
            _id: user._id,
            username: user.username,
            count: exercises.slice(-limit).length,
            log: exercises.slice(-limit).map(function(item) {
                item.date = item.date.toDateString();
                return item;
            })
    });

    
};