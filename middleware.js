module.exports.checkDay = function (req, res, next) {
    let str = req.body.date;
    let desc = req.body.description;
    let duration = parseInt(req.body.duration);
    if (desc === "") {
      return res.send('Path `description` is required.');
    }
    if (duration === "") {
      return res.send('Path `duration` is required.');
    }  
    if (isNaN(duration)) {
      return res.send(`Cast to Number failed for value "${req.body.duration}" at path "duration"`);
    }  
  
    if (str === "") {
        req.body.date = new Date();
        return next();
    }

    if (!str.match(/^[0-9|\-+]{0,}$/i)) {
        return res.send(`Cast to Date failed for value "${str}" at path "date"`);
    }
    
    let dateString = str.match(/[-|+]/i) ? str : parseInt(str);
    let date = dateString ? new Date(dateString) : new Date();
    
    if (date.toDateString() === 'Invalid Date') {
        return res.send(`Cast to Date failed for value "${str}" at path "date"`);
    }
    req.body.date = date;
    next();
}

