const { postController } = require('../app/post');
const { sitemapController } = require('../app/sitemap');

module.exports = app => {
    app.get('/sitemap.xml', sitemapController.getSitemap);
    app.get('/post/form', postController.getForm);
    app.post('/post/add', postController.addPost);
};
