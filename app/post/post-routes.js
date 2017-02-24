const ctrl = require('./post-controller');

module.exports = app => {

    app.get('/admin/posts', ctrl.getPosts);
    app.get('/admin/post/form/edit', ctrl.getEditForm);
    app.get('/admin/post/form/add', ctrl.getAddForm);
    app.post('/admin/post/save', ctrl.addPost);
    app.put('/admin/post/save', ctrl.updatePost);
    app.delete('/admin/post/remove', ctrl.removePost);        
    app.get('/post/:slug/', ctrl.viewPost);
};
