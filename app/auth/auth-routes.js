const ctrl = require('./auth-controller');

module.exports = app => {
    app.get('/login', ctrl.getLoginForm);
    //app.use('/*', api.verifyToken);
};