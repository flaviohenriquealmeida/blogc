const views = require('./views');
const User = require('../user').model;
const jwt  = require('jsonwebtoken');
const secret = 'homem avestruz'; // temporally!

module.exports = {

    async authenticate(req, res) {
        
        const user = await User.findOne({
             email: req.body.email,
             password: req.body.password
         });
         
         if (!user) {
             console.log('invalid login');
             res.redirect(`/login?invalid=true`);
         } else {
             console.log('valid login');
             var token = jwt.sign( { email: user.email }, secret, {
                 expiresIn: 86400 // valor em segundo, aqui temos um total de 24 horas
            });
            console.log('Autenticado: token adicionado na resposta');
            res.cookie('token', token, {
                expires  : new Date(Date.now() + 9999999),
                httpOnly : true
            });
            res.redirect('/admin/posts');
         }
    },

    isAuthenticated(req, res, next) {

        const token = req.cookies.token;
        if (token) {
             console.log('Token was send. Decodifying token...');
             jwt.verify(token, secret, function(err, decoded) {
                 if (err) {
                     console.log('Token was rejected');
                     return res.sendStatus(401).marko(views.errors.page401);
                 } else {
                     console.log('Token was accepted')
                     // guardou o valor decodificado do token na requisição. No caso, o login do usuário.
                     req.usuario = decoded;    
                     next();
                  }
            });
        } else {
            console.log('No token was send');
            res.status(401).redirect('/admin/login');
            next();
        }
    },

    getLoginForm(req, res) {

        res.marko(views.loginForm);
    },

    logout(req, res) {
        
        delete res.cookies.token;
        res.redirect('/admin/login');
    }
}