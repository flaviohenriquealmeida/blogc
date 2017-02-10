const { postController } = require('../app/post');
const { sitemapController } = require('../app/sitemap');

module.exports = app => {

    app.get('/posts', postController.getPosts);
    app.get('/post/form', postController.getAddForm);
    app.get('/post/form/:id', postController.getEditForm);
    app.post('/post/save', postController.addPost);
    app.post('/post/save/:id', postController.updatePost);
    app.post('/post/remove/:id', postController.removePost);        
    app.get('/post/:slug/', postController.viewPost);
    app.get('/', postController.getPosts);
    app.get('/sitemap.xml', sitemapController.getSitemap);
};
