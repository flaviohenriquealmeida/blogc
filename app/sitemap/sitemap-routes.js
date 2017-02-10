const ctrl = require('./sitemap-controller');

module.exports = app => {

    app.get('/sitemap.xml', ctrl.getSitemap);
};
