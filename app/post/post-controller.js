var Post = require('./post');

module.exports = {
      
      getForm(req, res) {
            res.marko(require('./views/form.marko'));
      },

      addPost(req, res) {

            req.body.private = req.body.private ? true : false;
            Post.create(req.body)
                  .then(
                        post => res.marko(require('./views/form.marko')),
                        err => {
                              console.log(err);
                              res.marko(require('./views/form.marko'))
                        }
                  );
      }
}