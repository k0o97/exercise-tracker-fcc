module.exports.checkDay = function (req, res, next) {
    let str = req.body.date;

    if (str === "") {
        req.body.date = new Date();
        return next();
    }

    if (!str.match(/^[0-9|\-+]{0,}$/i)) {
        return res.json({ error: 'Invalid Date' });
    }
    
    let dateString = str.match(/[-|+]/i) ? str : parseInt(str);
    let date = dateString ? new Date(dateString) : new Date();
    
    if (date.toDateString() === 'Invalid Date') {
        return res.json({ error: 'Invalid Date' });
    }
    req.body.date = date;
    next();
}

