const views = require('./views');
module.exports = {

    async authenticate(req, res) {

         const usuario = await model.findOne({
             login: req.body.login,
             senha: req.body.senha
         });
         if (!usuario) {
             console.log('Login/senha inválidos');
             res.sendStatus(401);
        } else {
            var token = jwt.sign( {login: usuario.login}, app.get('secret'), {
                expiresIn: 86400 // valor em segundo, aqui temos um total de 24 horas
            });
            console.log('Autenticado: token adicionado na resposta');
            res.set('x-access-token', token); // adicionando token no cabeçalho de resposta
            res.end(); // enviando a resposta
         }
     },

    verifyToken(req, res, ext) {

    },

    getLoginForm(req, res) {

        res.marko(views.loginForm);
    }
}