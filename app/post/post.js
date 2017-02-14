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
        required: true,
        type: String,
    }, 
    content: {
        required: true,
        type: String
        
    },
    
    markedContent: {
        required: true,
        type: String
    },

    private: {
        type: Boolean
    },

    publishedIn: {

        type: Date
    },

    createdIn: {
        type: Date
    }
});

module.exports = mongoose.model('Post', schema);
