var model = require('./post');

module.exports = {
      
      getForm(req, res) {
            res.marko(require('./views/form.marko'), { title: 'Teste'});
      },

      addPost(req, res) {
            
            model.create(req.body)
                  .then(
                        post => res.marko(require('./views/form.marko')),
                        err => {
                              console.log(err);
                              res.marko(require('./views/form.marko'))
                        }
                  );
      }
}