module.exports = app => {
    
    require('./auth').routes(app);
    require('./post').routes(app);
    require('./sitemap').routes(app);
}