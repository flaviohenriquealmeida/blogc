const { postController } = require('../app/post');
const { sitemapController } = require('../app/sitemap');

module.exports = app => {

    app.get('/posts', postController.getPosts);
    app.get('/post/form/edit', postController.getEditForm);
    app.get('/post/form/add', postController.getAddForm);
    app.post('/post/save', postController.addPost);
    app.put('/post/save', postController.updatePost);
    app.delete('/post/remove', postController.removePost);        
    app.get('/post/:slug/', postController.viewPost);
    app.get('/', postController.getPosts);
    app.get('/sitemap.xml', sitemapController.getSitemap);
};
