module.exports = app => {
    
    require('../app/post').routes(app);
    require('../app/sitemap').routes(app);
}