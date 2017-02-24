const ctrl = require('./auth-controller');

module.exports = app => {

    app.get('/admin/login', ctrl.getLoginForm);
    app.post('/admin/authenticate', ctrl.authenticate);
    app.use('/admin/*', ctrl.isAuthenticated);
};