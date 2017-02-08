const { postController } = require('../app/post');
const { sitemapController } = require('../app/sitemap');

module.exports = app => {

    app.get('/', postController.getPosts);
	app.get('/sitemap.xml', sitemapController.getSitemap);
    app.get('/post/form', postController.getForm);
    app.get('/post/form/:id', postController.getForm);
    app.post('/post/add', postController.addPost);
    app.get('/posts', postController.getPosts);
    app.get('/:slug', postController.viewPost);
};
