var mongoose = require('mongoose');

var schema = mongoose.Schema({
    slug: { 
        type: String, 
        required: true, 
        index: {
            unique: true
        }
    }, 
    title: {
        type: String, 
        required: true,
        index: {
            unique: true
        }
    }, 
    body: {
        type: String, 
    }
});

module.exports = mongoose.model('Post', schema);
