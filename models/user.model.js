const mongoose = require('mongoose');
const shortid = require('shortid');

let userSchema = mongoose.Schema({
    _id: {
        'type': String,
        'default': shortid.generate()
    },
    username: {
        'type': String,
        required: true,
        unique: true
    },
    log: {
        type: [{
            description: {
                type: String,
                required: true
            },
            duration: {
                type: Number,
                min: 1,
                required:true
            },
            date: {
                type: Date
            },
            _id: false
        }]
    }
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;