var mongoose = require('mongoose');

var schema = mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        index: {
            unique: true
        }
    }, 
    password: {
        required: true,
        type: String,
    }
});

module.exports = mongoose.model('User', schema);
