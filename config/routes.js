const { controller } = require('../app/post');

module.exports = app => {
    
    app.get('/post/form', controller.getForm);
    app.post('/post/add', controller.addPost);
};
