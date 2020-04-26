const mongoose = require('mongoose');
const shortid = require('shortid');

let userSchema = mongoose.Schema({
    _id: {
        'type': String,
        'default': shortid.generate()
    },
    username: {
        'type': String,
        required: true
    },
    log: {
        type: [{}]
    }
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;