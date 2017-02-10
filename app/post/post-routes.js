const ctrl = require('./post-controller');

module.exports = app => {

    app.get('/posts', ctrl.getPosts);
    app.get('/post/form/edit', ctrl.getEditForm);
    app.get('/post/form/add', ctrl.getAddForm);
    app.post('/post/save', ctrl.addPost);
    app.put('/post/save', ctrl.updatePost);
    app.delete('/post/remove', ctrl.removePost);        
    app.get('/post/:slug/', ctrl.viewPost);
    app.get('/', ctrl.getPosts);
};
