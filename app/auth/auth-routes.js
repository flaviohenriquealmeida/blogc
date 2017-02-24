const ctrl = require('./auth-controller');

module.exports = app => {

    app.get('/admin/login', ctrl.getLoginForm);
    app.get('/admin/logout', ctrl.logout);
    app.post('/admin/authenticate', ctrl.authenticate);
    app.use('/admin/*', ctrl.isAuthenticated);
};