module.exports = app => {
    
    require('./post').routes(app);
    require('./sitemap').routes(app);
}