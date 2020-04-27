const User = require('../models/user.model');

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
        if (!user) {
            return res.send('unknown _id');
        } 
        
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

module.exports.getLog = async function (req, res, next) {
    const MAX_DATE = '2050-01-01';
    const MAX_LIMIT = 1000;

    try {
        let userId = req.query.userId || "";
        let from = handlerDay(req.query.from);
        let to = handlerDay(req.query.to, MAX_DATE);
        let limitNumber = parseInt(req.query.limit)
        let limit = limitNumber > 0 ? limitNumber : -limitNumber || MAX_LIMIT;
        
        let user = await User.findOne({ _id: userId });
       
        let exercises = user.log.filter(function (exercise) {
            return exercise.date >= new Date(from) && exercise.date < new Date(to); 
        })
        .sort(function (a, b) {
          return b.date - a.date;
        })
        .map(function (item) {
            return {
                description: item.description,
                duration: item.duration,
                date: new Date(item.date).toDateString()
            };
        });
    
        let userRes = {
            _id: user._id,
            username: user.username,
            count: exercises.slice(0,limit).length,
            log: exercises.slice(0,limit)
        }
        
        if (from !== 0) {
            userRes.from = new  Date(from).toDateString();
    
            if (to !== MAX_DATE) {
                userRes.to = new Date(to).toDateString();
                return res.json(userRes);
            }
            return res.json(userRes);
        }
        else if (to !== MAX_DATE) {
            userRes.to = new Date(to).toDateString();
            if (from !== 0) {
                userRes.from = new Date(from).toDateString();
                return res.json(userRes);
            }
            return res.json(userRes);
        }
        res.json({
                _id: user._id,
                username: user.username,
                count: exercises.slice(0,limit).length,
                log: exercises.slice(0,limit)
        });    
    } 
    catch (error) {
        next(error);
    }
};