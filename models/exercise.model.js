const mongoose = require('mongoose');

let exerciseSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    log: [
        {
            description: {
                type: String,
                required: true
            },
            duration: {
                type: Number,
                required: true
            },
            date: {
                type: Date,
                default: new Date()
            }
        }
    ]
});