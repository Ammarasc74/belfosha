const mongoose = require('mongoose');

const userSchema = mongoose.Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: 'string',
        requried: true,
    },
    lastName: {
        type: 'string',
        requried: true,
    },
    email: {
        type: 'String',
        requried: true,
        uniqe: true
    },
    password: {
        type: 'String',
         required: true
        }
});

module.exports = mongoose.model('User', userSchema);